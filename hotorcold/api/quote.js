export default function handler(request, response) {
  let x = 2;

  return response.status(200).json({ quote: x });
}