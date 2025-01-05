"use server";
import { model } from "@/lib/geminiAI";
import {
  generateSummarySchema,
  GenerateSummaryValues,
  generateWorkExperienceDescriptionSchema,
  GenerateWorkExperienceDescriptionValues,
  WorkExperienceValue,
} from "@/lib/validation";

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
    50 to 100 words. The summary should include the job title, work experiences, educations, and skills of the user.
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

  // Generate the content from the "GEMINI AI" model with the system and user message
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
    generationConfig: {
      // Generation configuration for the AI model
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

// Generate Work Excperience description function to generate the work experience description of the resume
export async function generateWorkExperienceDescription(
  input: GenerateWorkExperienceDescriptionValues,
) {
  //

  // Validate the input data before generating the work experience description
  const { description } = generateWorkExperienceDescriptionSchema.parse(input);

  // System message
  const systemMessage = `
    You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

  Job title: <job title>
  Company: <company name>
  Location: <city, country> (only if provided)
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format using hyphen, might be inferred from the job title>
  `;

  // User message
  const userMessage = `
    Please generate a professional work experience description from this data:

    Description: ${description || "N/A"}
  `;

  // Generate the content from the "GEMINI AI" model with the system and user message
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
    generationConfig: {
      // Generation configuration for the AI model
      maxOutputTokens: 8192,
      temperature: 1,
      responseMimeType: "text/plain",
      topK: 40,
      topP: 0.9,
    },
  });

  // Get the response from the AI model result object in text format
  const aiResponse = result.response.text();

  console.log(aiResponse);

  // If no response from the AI, return an error
  if (!aiResponse) {
    throw new Error("Failed to generate the work experience description");
  }

  // Return the ai work experience description of the resume in bullet format with job title, company, start date, end date and description
  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
    description: (aiResponse.match(/Description: (.*)/)?.[1] || "").trim(),
  } satisfies WorkExperienceValue;
}
