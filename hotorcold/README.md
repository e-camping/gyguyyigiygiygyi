# Hot or Cold Word Guessing Game 🧠

A beautiful, AI-powered word guessing game where you try to find a secret word based on **semantic similarity ranking**. Get ranked based on how close your guess is in meaning!

Built with **React**, **TypeScript**, **Vite**, and **TensorFlow.js**.

## 🎮 How to Play

1. The computer secretly selects a target word from a list of 3,600+ common English words
2. All other words in the list are **ranked** by semantic similarity to the target word
3. You guess words by thinking about their **meanings**
4. After each guess, you see your **rank** - how close your word is to the target
5. **Lower rank = Closer to the target!**
6. Try to reach Rank #1 before finding the exact word!

### Ranking System

- **Rank #1:** The word with the closest meaning to the target
- **Rank #2-3:** Very close in meaning (🔥 HOT)
- **Top 20%:** Related concepts (🔥 HOT)
- **Top 40%:** Somewhat related (🌤 WARM)
- **Middle 60%:** Different meaning (🧊 COOL)
- **Bottom 20%:** Completely different (❄️ COLD)

**Example:** If the target is "computer":
- **Rank #1:** "software" (closest meaning)
- **Rank #3:** "technology" (related field)
- **Rank #10:** "network" (somewhat related)
- **Rank #20:** "security" (loosely connected)

## 🧠 What Makes This Special?

This game uses **AI-powered semantic similarity** via TensorFlow.js and the Universal Sentence Encoder model. Instead of comparing letter patterns, it understands the **actual meaning** of words and ranks them!

- "laptop" ranks higher than "compute" when target is "computer" (similar meaning vs shared letters)
- "king" and "queen" → High similarity (related concepts)
- "king" and "kingdom" → Lower similarity (different meanings despite shared spelling)

**Important:** You can only guess words from the word list (3,600+ common English words). If you guess a word not in the list, you'll see "Not in word list!" Use the searchable word list below the game to find available words!

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the Game

```bash
# Start the development server
npm run dev
```

The game will open in your browser at `http://localhost:5173`

**Note:**
- First load downloads the Universal Sentence Encoder model (~50MB)
- Rankings are computed when you start a new game (~10-15 seconds for 3,600+ words)
- Model and rankings are cached for better performance

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## ✨ Features

- 🧠 **AI-Powered Semantic Ranking** - Uses TensorFlow.js and Universal Sentence Encoder
- 📊 **Ranking System** - See exactly where your guess ranks among all words
- 📝 **3,600+ Word List** - Comprehensive English vocabulary with search functionality
- 🔍 **Searchable Word List** - Search and filter through available words
- ✅ Beautiful, modern UI with smooth animations
- ✅ Fully responsive design (mobile-friendly)
- ✅ Real-time meaning-based similarity ranking
- ✅ Hot/Warm/Cool/Cold feedback based on rank percentile
- ✅ Only words from the list are valid guesses
- ✅ "Not in word list!" validation for invalid words
- ✅ Pagination for large word lists (show first 100 with expand option)
- ✅ Visual indicators for guessed words
- ✅ Live guess history ranked by performance
- ✅ Input validation (letters only)
- ✅ Guess counter and statistics
- ✅ Model and ranking loading screens
- ✅ Victory screen with statistics
- ✅ Play again / New game functionality
- ✅ TypeScript for type safety
- ✅ Clean, well-commented code

## 🎯 How It Works

### Semantic Similarity Ranking

The game uses the **Universal Sentence Encoder**, a neural network trained by Google that converts words into high-dimensional vectors (embeddings) that capture semantic meaning.

**Game Flow:**

1. **Target Selection**: A random word is chosen as the target
2. **Ranking Computation**: All other words (~3,600) are compared to the target using semantic similarity
3. **Rank Assignment**: Words are sorted by similarity and assigned ranks (1 = most similar)
4. **Guess Processing**: When you guess, the game:
   - Validates that the word is in the word list
   - If not, shows "Not in word list!" error
   - If valid, returns the pre-computed rank for that word

**Similarity Calculation:**

```typescript
// 1. Embed all words into 512-dimensional vectors
const embeddings = await model.embed(words);

// 2. Calculate cosine similarity between target and each word
const similarity = cosineSimilarity(targetEmbedding, wordEmbedding);

// 3. Sort by similarity (highest first) and assign ranks
words.sort((a, b) => b.similarity - a.similarity);
const rankings = words.map((word, index) => ({ word, rank: index + 1 }));
```

### Word List

The game includes **3,600+ common English words** covering:
- Nouns (objects, people, places, concepts)
- Adjectives (descriptive words)
- Verbs (actions)
- Abstract concepts and concrete terms
- Technical and everyday vocabulary

The comprehensive word list is defined in [src/utils/wordlist.ts](src/utils/wordlist.ts). Players can search and browse available words using the in-game word list feature.

### Example Rankings

If target is "computer", the AI might rank:
1. software (0.89 similarity)
2. hardware (0.87 similarity)
3. technology (0.82 similarity)
4. digital (0.79 similarity)
5. system (0.76 similarity)
...
24. security (0.42 similarity)

## 📁 Project Structure

```
hotorcold/
├── src/
│   ├── components/
│   │   ├── GameBoard.tsx       # Main game interface with ranking
│   │   ├── GuessInput.tsx      # Input form for guesses
│   │   ├── GuessRankings.tsx   # Display ranked guess history
│   │   ├── Instructions.tsx    # Game instructions (ranking system)
│   │   ├── ModelLoader.tsx     # AI model loading screen
│   │   └── WordList.tsx        # Searchable word list with 3,600+ words
│   ├── utils/
│   │   ├── gameLogic.ts        # Semantic ranking logic (TensorFlow.js)
│   │   └── wordlist.ts         # 3,600+ word list array
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # Component styles (rank-based)
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **TensorFlow.js** - Machine learning in the browser
- **Universal Sentence Encoder** - Google's semantic similarity model
- **CSS3** - Modern styling with gradients and animations

## 📝 Development Notes

### Code Quality
- Full TypeScript coverage with strict type checking
- Comprehensive comments explaining AI logic
- Clean component architecture
- Responsive design patterns
- Memory management for TensorFlow tensors

### Performance
- Model loaded once and cached
- Rankings computed once per game (batch embedding)
- Efficient tensor disposal to prevent memory leaks
- Fast Vite dev server with HMR
- Optimized production builds

### AI Model
- Model size: ~50MB (cached after first load)
- Ranking computation: ~10-15 seconds for 3,600+ words (computed once per game)
- Inference time: Instant (ranks are pre-computed)
- Runs entirely in the browser (no server required)
- Works offline after initial model download

## 🎨 Customization

You can easily customize the game by modifying:

- **Word list**: Edit `WORD_LIST` in [src/utils/gameLogic.ts](src/utils/gameLogic.ts)
- **Rank thresholds**: Adjust values in `getRankFeedback()` in [src/utils/gameLogic.ts](src/utils/gameLogic.ts)
- **Colors and styling**: Modify CSS variables in [src/index.css](src/index.css)
- **Rank color classes**: Edit `.rank-top`, `.rank-hot`, etc. in [src/App.css](src/App.css)
- **UI components**: Customize React components in [src/components/](src/components/)

## 🧪 Technical Details

### Ranking Algorithm

```typescript
// Compute rankings for all words compared to target
export async function computeWordRankings(targetWord: string): Promise<WordRanking[]> {
  // 1. Filter out the target word
  const wordsToRank = WORD_LIST.filter(word => word !== targetWord);

  // 2. Embed all words at once (batch processing)
  const embeddings = await model.embed([targetWord, ...wordsToRank]);

  // 3. Calculate similarity for each word
  const similarities = wordsToRank.map((word, i) => ({
    word,
    similarity: cosineSimilarity(targetEmbedding, embeddings[i + 1])
  }));

  // 4. Sort by similarity (descending) and assign ranks
  similarities.sort((a, b) => b.similarity - a.similarity);
  return similarities.map((item, index) => ({
    ...item,
    rank: index + 1
  }));
}
```

### Why Cosine Similarity?

Cosine similarity measures the angle between two vectors, perfect for semantic similarity:
- 1.0 (0°) = identical meaning
- 0.8-0.9 = very similar (synonyms)
- 0.6-0.7 = related concepts
- 0.4-0.5 = loosely related
- 0.0-0.3 = unrelated

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and add your own features!

Some ideas:
- Multiple difficulty levels (different word lists)
- Show top 3 ranked words as hints
- Timer mode / speed challenge
- Multiplayer mode
- Custom word lists
- Multi-language support

## 🙏 Credits

- **Universal Sentence Encoder** - Google Research
- **TensorFlow.js** - TensorFlow team
- **React** - Meta/Facebook
- Inspired by **Semantle** and similar word games

---

**Enjoy the game!** 🎮✨🧠

*Challenge yourself to find Rank #1 before guessing the target word!*
