/**
 * Instructions component - displays game rules and how to play (ranking system)
 */

interface InstructionsProps {
  onStart: () => void;
}

export default function Instructions({ onStart }: InstructionsProps) {
  return (
    <div className="instructions">
      <h1>🎮 HOT OR COLD</h1>
      <h2>Ranking System</h2>

      <div className="instructions-content">
        <h3>HOW TO PLAY:</h3>
        <ul>
          <li>I've secretly chosen a word from my word list of 3,600+ words</li>
          <li>Try to guess it by thinking about word <strong>meanings</strong></li>
          <li>After each guess, you'll see your <strong>rank</strong> - how close your word is in meaning to the target</li>
        </ul>

        <div className="feedback-guide">
          <div className="feedback-item hot">
            <span className="emoji">🔥</span>
            <div>
              <strong>RANK #1-3</strong>
              <p>You found one of the closest words!</p>
            </div>
          </div>

          <div className="feedback-item warm">
            <span className="emoji">🌤</span>
            <div>
              <strong>TOP 20-40%</strong>
              <p>Getting warmer... Related meaning</p>
            </div>
          </div>

          <div className="feedback-item cold">
            <span className="emoji">🧊</span>
            <div>
              <strong>MIDDLE 40-80%</strong>
              <p>Not quite there... Different meaning</p>
            </div>
          </div>

          <div className="feedback-item ice-cold">
            <span className="emoji">❄️</span>
            <div>
              <strong>BOTTOM 20%</strong>
              <p>Way off... Completely different!</p>
            </div>
          </div>
        </div>

        <div className="how-it-works">
          <h3>🧠 HOW IT WORKS:</h3>
          <p>
            The game uses <strong>AI-powered semantic similarity</strong> to rank ALL words in the word list
            based on how similar their meanings are to the target word. The word with the closest meaning gets
            <strong> Rank #1</strong>, and so on.
          </p>
          <p className="example">
            <strong>Example:</strong> If the target is "computer":
          </p>
          <ul className="example-list">
            <li><strong>Rank #1:</strong> "laptop" (very similar device)</li>
            <li><strong>Rank #3:</strong> "technology" (related field)</li>
            <li><strong>Rank #10:</strong> "network" (somewhat related)</li>
            <li><strong>Rank #20:</strong> "security" (loosely connected)</li>
          </ul>
          <p>
            Your goal is to guess words with <strong>lower ranks</strong> - they have meanings closer to the target!
          </p>
        </div>

        <ul>
          <li><strong>Lower rank number = Closer to the target</strong></li>
          <li><strong>You can only guess words from the word list</strong> (3,600+ common English words)</li>
          <li>If you guess a word not in the list, you'll see "Not in word list!"</li>
          <li>Use the word list search below to find and explore available words!</li>
          <li>Try to reach Rank #1 before finding the exact word!</li>
        </ul>
      </div>

      <button className="start-button" onClick={onStart}>
        Start Playing
      </button>
    </div>
  );
}
