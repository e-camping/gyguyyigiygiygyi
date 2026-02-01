/**
 * Game logic utilities for the Hot or Cold word guessing game
 * Uses semantic similarity ranking system - ranks words by meaning
 */

import * as use from '@tensorflow-models/universal-sentence-encoder';
import '@tensorflow/tfjs';
import { WORD_LIST as IMPORTED_WORD_LIST } from './wordlist';

// Use the comprehensive word list (~3,600 words)
export const WORD_LIST = IMPORTED_WORD_LIST;

// Interface for word rankings
export interface WordRanking {
  word: string;
  similarity: number;
  rank: number; // 1 = most similar, higher = less similar
}

// Interface for guess data
export interface GuessData {
  word: string;
  rank: number; // Rank of this word compared to all words
  totalWords: number; // Total number of ranked words
  similarity: number; // Raw similarity score for reference
}

// Singleton model instance
let modelInstance: use.UniversalSentenceEncoder | null = null;
let modelLoadingPromise: Promise<use.UniversalSentenceEncoder> | null = null;

/**
 * Load the Universal Sentence Encoder model.
 * This is called once and the model is reused for all similarity calculations.
 */
export async function loadModel(): Promise<use.UniversalSentenceEncoder> {
  // If model is already loaded, return it
  if (modelInstance) {
    return modelInstance;
  }

  // If model is currently loading, wait for that promise
  if (modelLoadingPromise) {
    return modelLoadingPromise;
  }

  // Start loading the model
  modelLoadingPromise = use.load();
  modelInstance = await modelLoadingPromise;

  console.log('Universal Sentence Encoder model loaded successfully');
  return modelInstance;
}

/**
 * Calculate cosine similarity between two vectors.
 * Returns a value between -1 and 1, where 1 means identical.
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
}

/**
 * Compute rankings for all words in the word list compared to a target word.
 * Returns an array of WordRanking objects sorted by similarity (most similar first).
 */
export async function computeWordRankings(targetWord: string): Promise<WordRanking[]> {
  const model = await loadModel();

  // Get all words except the target word
  const wordsToRank = WORD_LIST.filter(word => word.toLowerCase() !== targetWord.toLowerCase());

  // Embed all words at once for efficiency
  const allWords = [targetWord, ...wordsToRank];
  const embeddings = await model.embed(allWords.map(w => w.toLowerCase()));
  const embeddingsArray = await embeddings.array();

  // Target embedding is first
  const targetEmbedding = embeddingsArray[0];

  // Calculate similarity for each word
  const similarities: { word: string; similarity: number }[] = [];
  for (let i = 1; i < embeddingsArray.length; i++) {
    const similarity = cosineSimilarity(targetEmbedding, embeddingsArray[i]);
    similarities.push({
      word: wordsToRank[i - 1],
      similarity: Math.max(0, similarity)
    });
  }

  // Sort by similarity (highest first)
  similarities.sort((a, b) => b.similarity - a.similarity);

  // Assign ranks
  const rankings: WordRanking[] = similarities.map((item, index) => ({
    word: item.word,
    similarity: item.similarity,
    rank: index + 1 // Rank starts at 1
  }));

  // Clean up tensors
  embeddings.dispose();

  console.log('Rankings computed:', rankings.slice(0, 5)); // Log top 5 for debugging

  return rankings;
}

/**
 * Find the rank of a guessed word in the pre-computed rankings.
 * Returns GuessData with rank information.
 * Throws an error if the word is not in the rankings.
 */
export function processGuess(
  guess: string,
  rankings: WordRanking[]
): GuessData {
  const guessLower = guess.toLowerCase().trim();

  // Check if the guess is in our pre-computed rankings
  const ranking = rankings.find(r => r.word.toLowerCase() === guessLower);

  if (!ranking) {
    throw new Error("NOT_IN_WORD_LIST");
  }

  // Word is in the word list, return its rank
  return {
    word: guessLower,
    rank: ranking.rank,
    totalWords: rankings.length,
    similarity: ranking.similarity
  };
}

/**
 * Get emoji and feedback message based on rank.
 */
export function getRankFeedback(rank: number, totalWords: number): { emoji: string; message: string } {
  const percentile = (rank / totalWords) * 100;

  if (rank === 1) {
    return { emoji: "🔥", message: "INCREDIBLE! You found the #1 closest word!" };
  } else if (rank <= 3) {
    return { emoji: "🔥", message: "SO HOT! You're in the top 3!" };
  } else if (percentile <= 20) {
    return { emoji: "🔥", message: "HOT! Top 20%!" };
  } else if (percentile <= 40) {
    return { emoji: "🌤", message: "WARM! Getting closer..." };
  } else if (percentile <= 60) {
    return { emoji: "🧊", message: "COOL... Keep trying" };
  } else if (percentile <= 80) {
    return { emoji: "❄️", message: "COLD... Not quite there" };
  } else {
    return { emoji: "❄️", message: "ICE COLD... Very different meaning" };
  }
}

/**
 * Validate a guess - must be alphabetic and not empty.
 * Returns an error message if invalid, or null if valid.
 */
export function validateGuess(guess: string): string | null {
  if (!guess || guess.trim() === "") {
    return "Guess cannot be empty!";
  }

  if (!/^[a-zA-Z\s]+$/.test(guess)) {
    return "Guess must contain only letters (no numbers or symbols)!";
  }

  if (guess.trim().length < 2) {
    return "Guess must be at least 2 letters long!";
  }

  // Check if word is in the word list
  const guessLower = guess.toLowerCase().trim();
  const isInWordList = WORD_LIST.some(word => word.toLowerCase() === guessLower);

  if (!isInWordList) {
    return "Not in word list!";
  }

  return null;
}

/**
 * Get a random word from the word list.
 */
export function getRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

/**
 * Check if the model is loaded.
 */
export function isModelLoaded(): boolean {
  return modelInstance !== null;
}
