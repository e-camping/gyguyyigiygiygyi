'use client';

import { LessonLayout } from '@/components/LessonLayout';
import { CodeExample } from '@/components/CodeExample';
import { InteractiveExercise } from '@/components/InteractiveExercise';
import { markLessonComplete } from '@/lib/progressTracker';

export default function TextEmbeddingLesson() {
  const handleComplete = () => {
    markLessonComplete('4');
  };

  return (
    <LessonLayout
      title="Text Embedding"
      description="Learn how computers represent words as vectors to understand meaning"
      currentSlug="text-embedding"
      lessonId="4"
      type="interactive"
    >
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What Are Text Embeddings?</h2>
        <p className="mb-4">
          Computers don't understand words like humans do. They only understand numbers. So how do we teach a computer
          what "cat" or "happy" means? We use <strong>text embeddings</strong>!
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="font-semibold mb-2">Simple Definition:</p>
          <p>
            A <strong>text embedding</strong> is a way to represent a word (or sentence) as a list of numbers
            (a vector). Similar words get similar numbers.
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-3">Example: Word to Vector</h3>
        <CodeExample
          language="python"
          code={`# Instead of just the word "cat", we represent it as numbers:
cat = [0.2, 0.8, 0.1, 0.9, 0.3]

# Similar words have similar numbers:
dog = [0.3, 0.7, 0.2, 0.8, 0.4]  # Similar to cat!

# Very different words have very different numbers:
pizza = [0.9, 0.1, 0.7, 0.2, 0.8]  # Not similar to cat

# Now the computer can measure "similarity" using math!`}
        />

        <p className="mt-4 mb-4">
          The magic is that words with similar <em>meanings</em> end up with similar numbers. Words like
          "cat" and "dog" will have similar vectors, but "cat" and "pizza" won't.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How Do We Measure Similarity?</h2>
        <p className="mb-4">
          Once we have words as vectors (lists of numbers), we can measure how similar they are using
          <strong> cosine similarity</strong> or other distance metrics.
        </p>

        <h3 className="text-xl font-semibold mb-3">Simple Similarity: Character Overlap</h3>
        <p className="mb-4">
          A basic way to measure word similarity is to count how many letters they have in common:
        </p>

        <CodeExample
          title="Character-Based Similarity"
          language="python"
          code={`def simple_similarity(word1, word2):
    # Get unique characters from each word
    chars1 = set(word1.lower())
    chars2 = set(word2.lower())

    # Find common characters (intersection)
    common = chars1 & chars2

    # Jaccard similarity: intersection / union
    union = chars1 | chars2
    similarity = len(common) / len(union)

    return similarity

# Examples
simple_similarity("cat", "hat")      # 0.5 (share 'a' and 't')
simple_similarity("cat", "dog")      # 0.0 (no common letters)
simple_similarity("happy", "happen") # 0.57 (share h, a, p)`}
        />

        <h3 className="text-xl font-semibold mb-3 mt-6">Advanced: Semantic Embeddings</h3>
        <p className="mb-4">
          Real AI models use much more sophisticated embeddings that capture <em>meaning</em>, not just letters.
          These are learned from massive amounts of text:
        </p>

        <CodeExample
          language="python"
          code={`# Modern embedding models understand that these are similar in meaning:
similarity("king", "queen")      # High similarity (both royalty)
similarity("walk", "run")        # High similarity (both movement)
similarity("doctor", "hospital") # High similarity (related concepts)

# Even though they share no letters!
# The model learned from seeing how words are used in context.`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Creating Text Embeddings</h2>
        <p className="mb-4">
          Let's learn how to create a simple text embedding using character frequencies. This is a basic
          approach that helps understand the concept before moving to more advanced methods.
        </p>

        <h3 className="text-xl font-semibold mb-3">Character Frequency Vectors</h3>
        <p className="mb-4">
          One simple way to create a text embedding is to represent each word by the frequency of its characters:
        </p>

        <CodeExample
          title="Character-Based Embedding"
          language="python"
          code={`def compute_char_vector(word):
    # Count character frequencies
    from collections import Counter
    lower_word = word.lower()
    char_count = Counter(lower_word)

    # Normalize by word length to get frequencies
    total = len(lower_word)
    vector = {char: count / total for char, count in char_count.items()}

    return vector

# Example: "cat" becomes:
# {'c': 0.33, 'a': 0.33, 't': 0.33}

# Example: "pizza" becomes:
# {'p': 0.2, 'i': 0.2, 'z': 0.4, 'a': 0.2}
# Notice 'z' is 0.4 because it appears twice!`}
        />

        <h3 className="text-xl font-semibold mb-3 mt-6">Computing Cosine Similarity</h3>
        <p className="mb-4">
          Once we have vectors, we can measure how similar they are using <strong>cosine similarity</strong>.
          This measures the angle between two vectors (0 = completely different, 1 = identical).
        </p>

        <CodeExample
          language="python"
          code={`def cosine_similarity(vec1, vec2):
    import math

    # Get all unique characters from both vectors
    all_chars = set(vec1.keys()) | set(vec2.keys())

    # Compute dot product
    dot_product = 0
    for char in all_chars:
        v1 = vec1.get(char, 0)
        v2 = vec2.get(char, 0)
        dot_product += v1 * v2

    # Compute magnitudes
    mag1 = math.sqrt(sum(v ** 2 for v in vec1.values()))
    mag2 = math.sqrt(sum(v ** 2 for v in vec2.values()))

    if mag1 == 0 or mag2 == 0:
        return 0

    return dot_product / (mag1 * mag2)

# Examples:
cosine_similarity(
    {'c': 0.33, 'a': 0.33, 't': 0.33},  # "cat"
    {'c': 0.33, 'a': 0.33, 'r': 0.33}   # "car"
)  # Returns ~0.67 (high similarity - share 'c' and 'a')

cosine_similarity(
    {'c': 0.33, 'a': 0.33, 't': 0.33},  # "cat"
    {'d': 0.33, 'o': 0.33, 'g': 0.33}   # "dog"
)  # Returns 0 (no common characters)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How Embeddings Are Used in AI</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🔍 Search Engines</h3>
            <p className="text-sm">
              When you search "how to fix a leaky faucet", embeddings help find results about
              "repairing dripping sinks" even though the words are different.
            </p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">💬 Chatbots</h3>
            <p className="text-sm">
              Embeddings help AI understand that "What's the weather?" and "How's it outside?" are asking
              the same thing.
            </p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🌐 Translation</h3>
            <p className="text-sm">
              Words in different languages with similar meanings get similar embeddings, helping translation
              models work better.
            </p>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">📝 Recommendations</h3>
            <p className="text-sm">
              If you like articles about "machine learning", embeddings help recommend articles about
              "artificial intelligence" and "neural networks".
            </p>
          </div>
        </div>
      </section>

      <InteractiveExercise
        exerciseId="embedding-similarity"
        title="Exercise: Rank Words by Similarity"
        instructions={`
          <p>Implement a function that ranks words by their similarity to a target word using text embeddings!</p>
          <p><strong>Your Task:</strong> Complete the <code>rank_words_by_similarity</code> function that:</p>
          <ol>
            <li>Creates character frequency embeddings for the target word and all candidate words</li>
            <li>Computes cosine similarity between the target and each candidate word</li>
            <li>Ranks words from most similar (rank 1) to least similar</li>
            <li>Returns a dictionary mapping each word to its rank</li>
          </ol>
          <p><strong>Helper Functions Provided:</strong></p>
          <ul>
            <li><code>compute_char_vector(word)</code> - Creates a character frequency vector for a word</li>
            <li><code>cosine_similarity(vec1, vec2)</code> - Computes similarity between two vectors (0 to 1)</li>
          </ul>
          <p><strong>Example:</strong> For target "cat" and words ["cat", "car", "dog"], return: <code>{"cat": 1, "car": 2, "dog": 3}</code></p>
          <p><strong>Hint:</strong> Create a list of (word, similarity) tuples, sort by similarity (highest first), then create the rank mapping!</p>
        `}
        starterCode={`from collections import Counter
import math

# Helper function: Creates character frequency vector
def compute_char_vector(word):
    lower_word = word.lower()
    char_count = Counter(lower_word)
    total = len(lower_word)
    vector = {char: count / total for char, count in char_count.items()}
    return vector

# Helper function: Computes cosine similarity
def cosine_similarity(vec1, vec2):
    all_chars = set(vec1.keys()) | set(vec2.keys())
    dot_product = sum(vec1.get(char, 0) * vec2.get(char, 0) for char in all_chars)
    mag1 = math.sqrt(sum(v ** 2 for v in vec1.values()))
    mag2 = math.sqrt(sum(v ** 2 for v in vec2.values()))
    if mag1 == 0 or mag2 == 0:
        return 0
    return dot_product / (mag1 * mag2)

# YOUR CODE: Implement this function!
def rank_words_by_similarity(target, words):
    # Step 1: Create embedding for target word

    # Step 2: Create embeddings for all words and compute their similarities

    # Step 3: Sort words by similarity (highest first)

    # Step 4: Create rank mapping {word: rank}

    # Return the rank mapping
    return {}`}
        testCases={[
          {
            input: ['cat', ['cat', 'car', 'dog', 'bat', 'rat']],
            expectedOutput: { 'cat': 1, 'car': 2, 'bat': 3, 'rat': 4, 'dog': 5 },
            description: 'Rank words similar to "cat" - exact match ranks first'
          },
          {
            input: ['hello', ['hello', 'jello', 'yellow', 'mellow', 'world']],
            expectedOutput: { 'hello': 1, 'jello': 2, 'yellow': 3, 'mellow': 4, 'world': 5 },
            description: 'Words with more shared characters rank higher'
          },
          {
            input: ['pizza', ['pizza', 'piazza', 'pita', 'pasta', 'apple']],
            expectedOutput: { 'pizza': 1, 'piazza': 2, 'pita': 3, 'pasta': 4, 'apple': 5 },
            description: 'Food words ranked by character similarity'
          }
        ]}
        language="python"
        onComplete={handleComplete}
      />

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>Text embeddings convert words into vectors (lists of numbers)</li>
          <li>Similar words get similar vectors, allowing computers to understand meaning</li>
          <li>We can measure similarity using math (cosine similarity, Jaccard similarity, etc.)</li>
          <li>Modern AI models learn embeddings from massive amounts of text data</li>
          <li>Embeddings power search engines, chatbots, translation, and more</li>
        </ul>
      </section>
    </LessonLayout>
  );
}
