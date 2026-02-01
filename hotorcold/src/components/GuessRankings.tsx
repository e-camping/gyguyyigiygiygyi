/**
 * GuessRankings component - displays all guesses ranked by their semantic similarity rank
 */

import { GuessData, getRankFeedback } from "../utils/gameLogic";

interface GuessRankingsProps {
  guesses: GuessData[];
}

export default function GuessRankings({ guesses }: GuessRankingsProps) {
  if (guesses.length === 0) {
    return null;
  }

  // Sort guesses by rank (ascending - lower rank is better)
  const sortedGuesses = [...guesses].sort((a, b) => a.rank - b.rank);

  // Function to get the CSS class based on rank percentile
  const getRankClass = (rank: number, totalWords: number): string => {
    const percentile = (rank / totalWords) * 100;
    if (rank <= 3) return "rank-top";
    if (percentile <= 20) return "rank-hot";
    if (percentile <= 40) return "rank-warm";
    if (percentile <= 60) return "rank-cool";
    return "rank-cold";
  };

  return (
    <div className="guess-rankings">
      <h3>📊 Your Guess History</h3>
      <p className="rankings-subtitle">Sorted by best rank (lowest number = closer to target)</p>

      <div className="rankings-list">
        {sortedGuesses.map((guess, index) => {
          const feedback = getRankFeedback(guess.rank, guess.totalWords);
          return (
            <div
              key={`${guess.word}-${index}`}
              className={`ranking-item ${getRankClass(guess.rank, guess.totalWords)}`}
            >
              <div className="guess-position">#{index + 1}</div>
              <div className="guess-word">{guess.word}</div>
              <div className="guess-rank">
                Rank <strong>#{guess.rank}</strong>/{guess.totalWords}
              </div>
              <div className="guess-feedback">
                <span className="emoji">{feedback.emoji}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
