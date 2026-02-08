/**
 * GuessInput component - handles user input for guesses
 */

import { useState } from "react";
import { validateGuess } from "../utils/gameLogic";

interface GuessInputProps {
  onGuess: (guess: string) => void;
  onGiveUp?: () => void;
  disabled?: boolean;
  guessCount?: number;
}

export default function GuessInput({ onGuess, onGiveUp, disabled = false, guessCount = 0 }: GuessInputProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the guess
    const validationError = validateGuess(input);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Clear error and submit guess
    setError(null);
    onGuess(input.trim().toLowerCase());
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (error) {
      setError(null); // Clear error when user starts typing
    }
  };

  return (
    <div className="guess-input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your guess..."
            disabled={disabled}
            className={error ? "error" : ""}
            autoFocus
          />
          <button type="submit" disabled={disabled || !input.trim()}>
            Guess
          </button>
          {guessCount >= 10 && onGiveUp && (
            <button type="button" className="give-up-button" onClick={onGiveUp}>
              Give Up
            </button>
          )}
        </div>
        {error && <div className="error-message">❌ {error}</div>}
      </form>
    </div>
  );
}
