/**
 * GameBoard component - main game interface with ranking system
 */

import { useState, useEffect } from "react";
import {
  getRandomWord,
  processGuess,
  computeWordRankings,
  getRankFeedback,
  GuessData,
  WordRanking
} from "../utils/gameLogic";
import GuessInput from "./GuessInput";
import GuessRankings from "./GuessRankings";
import WordList from "./WordList";

interface GameBoardProps {
  onReset: () => void;
}

export default function GameBoard({ onReset }: GameBoardProps) {
  const [targetWord] = useState(() => getRandomWord());
  const [rankings, setRankings] = useState<WordRanking[]>([]);
  const [rankingsLoaded, setRankingsLoaded] = useState(false);
  const [guesses, setGuesses] = useState<GuessData[]>([]);
  const [currentGuess, setCurrentGuess] = useState<GuessData | null>(null);
  const [won, setWon] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [processing, setProcessing] = useState(false);

  // Compute rankings when component mounts
  useEffect(() => {
    const computeRankings = async () => {
      try {
        console.log(`Computing rankings for target word: ${targetWord}`);
        const wordRankings = await computeWordRankings(targetWord);
        setRankings(wordRankings);
        setRankingsLoaded(true);
        console.log(`Rankings loaded: ${wordRankings.length} words ranked`);
      } catch (error) {
        console.error("Error computing rankings:", error);
        alert("Error initializing game. Please refresh the page.");
      }
    };

    computeRankings();
  }, [targetWord]);

  const handleGuess = (guess: string) => {
    // Check if the guess is correct (exact match)
    if (guess.toLowerCase().trim() === targetWord.toLowerCase()) {
      setWon(true);
      setGuessCount((prev) => prev + 1);
      return;
    }

    // Process the guess (determine rank)
    setProcessing(true);
    try {
      const guessData = processGuess(guess, rankings);
      setGuesses((prev) => [...prev, guessData]);
      setCurrentGuess(guessData);
      setGuessCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error processing guess:", error);
      alert("Error processing your guess. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handlePlayAgain = () => {
    onReset();
  };

  // Show loading screen while rankings are being computed
  if (!rankingsLoaded) {
    return (
      <div className="game-board">
        <div className="game-header">
          <h1>🎮 HOT OR COLD</h1>
          <p className="game-subtitle">Ranking System</p>
        </div>
        <div className="processing-indicator">
          <div className="spinner"></div>
          <p>🧠 Computing word rankings...</p>
          <p className="loading-subtext">
            Analyzing semantic similarity for 3,600+ words using AI...
            <br />
            This takes ~10-15 seconds (one-time per game)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-board">
      <div className="game-header">
        <h1>🎮 HOT OR COLD</h1>
        <p className="game-subtitle">Ranking System</p>
        <button className="reset-button" onClick={handlePlayAgain}>
          New Game
        </button>
      </div>

      {!won ? (
        <>
          <div className="game-info">
            <div className="info-card">
              <span className="label">Target Word Length:</span>
              <span className="value">{targetWord.length} letters</span>
            </div>
            <div className="info-card">
              <span className="label">Guess Count:</span>
              <span className="value">{guessCount}</span>
            </div>
            <div className="info-card">
              <span className="label">Total Words:</span>
              <span className="value">{rankings.length}</span>
            </div>
          </div>

          <GuessInput onGuess={handleGuess} disabled={won || processing} />

          {processing && (
            <div className="processing-indicator">
              <div className="spinner"></div>
              <p>Finding your rank...</p>
            </div>
          )}

          {currentGuess && !processing && (
            <div className="current-feedback rank-feedback">
              <div className="rank-display">
                <div className="rank-emoji">{getRankFeedback(currentGuess.rank, currentGuess.totalWords).emoji}</div>
                <div className="rank-info">
                  <div className="rank-number">
                    Rank: <strong>#{currentGuess.rank}</strong> / {currentGuess.totalWords}
                  </div>
                  <div className="rank-message">
                    {getRankFeedback(currentGuess.rank, currentGuess.totalWords).message}
                  </div>
                  <div className="rank-word">
                    Your guess: <strong>{currentGuess.word}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          <GuessRankings guesses={guesses} />

          <WordList
            targetWord={targetWord}
            guessedWords={guesses.map(g => g.word)}
          />
        </>
      ) : (
        <div className="victory-screen">
          <div className="victory-content">
            <div className="victory-emoji">🎉</div>
            <h2>CONGRATULATIONS!</h2>
            <p className="victory-message">You found the word!</p>
            <div className="victory-word">{targetWord.toUpperCase()}</div>
            <p className="victory-stats">
              You guessed it in <strong>{guessCount}</strong> {guessCount === 1 ? "guess" : "guesses"}!
            </p>
            <button className="play-again-button" onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>

          {guesses.length > 0 && (
            <div className="final-rankings">
              <h3>Your Journey:</h3>
              <GuessRankings guesses={guesses} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
