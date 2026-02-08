export default function handler(request, response) {
  const quotes = [
    "hello"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return response.status(200).json({ quote: randomQuote });
}