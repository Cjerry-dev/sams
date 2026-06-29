// This is a simple serverless function for Vercel
export default function handler(request, response) {
  response.status(200).json({
    message: "The API is working! Now you can connect your database."
  });
}
