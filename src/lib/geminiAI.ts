import { env } from "@/env";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Api Key for the Google Generative AI
const apiKey = env.GEMINI_API_KEY;

// GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(apiKey);

// getGenerativeModel function to get the generative model
export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});