/**
 * WordList component - displays available words for guessing with search
 */

import { useState } from "react";
import { WORD_LIST } from "../utils/gameLogic";

interface WordListProps {
  targetWord: string;
  guessedWords: string[];
}

export default function WordList({ targetWord, guessedWords }: WordListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Filter out the target word and sort alphabetically
  const availableWords = WORD_LIST
    .filter(word => word.toLowerCase() !== targetWord.toLowerCase())
    .sort();

  // Filter by search term
  const filteredWords = availableWords.filter(word =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show only first 100 words unless "show all" is clicked
  const displayWords = showAll ? filteredWords : filteredWords.slice(0, 100);

  const isGuessed = (word: string) => {
    return guessedWords.some(g => g.toLowerCase() === word.toLowerCase());
  };

  const guessedCount = availableWords.filter(isGuessed).length;

  return (
    <div className="word-list">
      <h3>📝 Word List</h3>
      <p className="word-list-subtitle">
        {availableWords.length} words available ({guessedCount} guessed)
      </p>

      <div className="word-list-search">
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="clear-search"
            onClick={() => setSearchTerm("")}
          >
            Clear
          </button>
        )}
      </div>

      <div className="word-list-stats">
        {searchTerm && (
          <p className="search-results">
            Found {filteredWords.length} word{filteredWords.length !== 1 ? 's' : ''}
          </p>
        )}
        {filteredWords.length > 100 && !showAll && (
          <button
            className="show-all-button"
            onClick={() => setShowAll(true)}
          >
            Show all {filteredWords.length} words
          </button>
        )}
        {showAll && filteredWords.length > 100 && (
          <button
            className="show-all-button"
            onClick={() => setShowAll(false)}
          >
            Show less
          </button>
        )}
      </div>

      <div className="words-grid">
        {displayWords.map((word) => (
          <div
            key={word}
            className={`word-chip ${isGuessed(word) ? "guessed" : ""}`}
          >
            {word}
          </div>
        ))}
      </div>

      {!showAll && filteredWords.length > 100 && (
        <div className="word-list-footer">
          <p>Showing first 100 of {filteredWords.length} words</p>
        </div>
      )}
    </div>
  );
}
