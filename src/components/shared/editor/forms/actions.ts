"use server";
import {
  generateSummarySchema,
  GenerateSummaryValues,
} from "@/helpers/validation";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Api Key for the Google Generative AI
const apiKey = process.env.GEMINI_API_KEY!;

// GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(apiKey);

// getGenerativeModel function to get the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

// Generate Summary function to generate the summary of the resume
export async function generateSummary(input: GenerateSummaryValues) {
  // TODO:

  // Validate the input data before generating the summary
  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  // System message
  const systemMessage = `
    You are a job resume generator that can generate a professional summary of the resume based on the 
    input data which is a resume of the user. The input data includes the job title, work experiences, 
    educations, and skills of the user. The system will generate a professional summary of the resume and it should be between 
    100 to 150 words. The summary should include the job title, work experiences, educations, and skills of the user.
    Also make the summary eye catching and professional so that it can attract the employers. Give response in text format.
  `;

  // User message
  const userMessage = `
    Please generate a professional resume summary from this data:

    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

        Description:
        ${exp.description || "N/A"}
        `,
      )
      .join("\n\n")}

      Education:
    ${educations
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
        `,
      )
      .join("\n\n")}

      Skills:
      ${skills}
    `;

  // Generate the content from the model with the system and user message
  const result = await model.generateContent({
    contents: [
      {
        role: "model",
        parts: [
          {
            text: systemMessage,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: userMessage,
          },
        ],
      },
    ],
    generationConfig: { // Generation configuration for the AI model
      maxOutputTokens: 8192,
      temperature: 1,
      responseMimeType: "text/plain",
      topK: 40,
      topP: 0.9,
    },
  });

  // Get the response from the AI model result object in text format
  const aiResponse = result.response.text();

  // If no response from the AI, return an error
  if (!aiResponse) {
    throw new Error("Failed to generate the summary");
  }

  // Return the ai summary of the resume
  return aiResponse;
}
