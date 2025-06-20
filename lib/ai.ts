// lib/ai.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getJobMatches(resume: string, category: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an AI career advisor.

Given the resume below, return 3–5 job roles this person is a strong match for (category: "${category}").

For each job, include:
- 🏷️ Job Title
- 🛠️ Matching Skills
- 🤝 Why this user is a good fit
- 💡 One suggestion to improve fit
- 📊 Match Score (1–100)

Also give a final section:
- 🧠 Top 3 Skills they should learn to become a better fit

Resume:
"""
${resume}
"""
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}