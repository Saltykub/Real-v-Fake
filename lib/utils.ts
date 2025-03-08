import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import OpenAI from "openai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

export const systemPrompt = `

You are an expert at detecting whether a text was written by a human or generated by an AI model. Your goal is to analyze a given text and classify it as **AI-generated** or **human-written** with a confidence score.

### **Evaluation Criteria**
Use the following steps to analyze the text:

1. **Writing Style & Structure**  
   - Does the text follow a rigid, highly structured format, or does it have natural human variation?  
   - AI-generated text tends to use **consistent sentence lengths, perfect grammar, and a polished flow** that lacks human-like imperfections.  

2. **Logical Flow & Coherence**  
   - Does the text **progress naturally**, or does it feel like a mechanically structured response?  
   - AI text often **lacks deep contextual awareness** and may **repeat ideas** instead of building naturally on them.  

3. **Emotional Depth & Personal Expression**  
   - Is there a **genuine emotional tone, unique perspective, or personal story**?  
   - AI responses **lack real emotions** and often **sound neutral, diplomatic, or overly formal**.  

4. **Repetitive Phrasing & Generic Language**  
   - AI models often use **generic, overly formal, or redundant** language.  
   - Humans tend to have **minor inconsistencies, typos, and unique expressions** that AI lacks.  

5. **Creativity & Originality**  
   - AI-generated text often **lacks creativity** beyond known patterns and tends to provide **generalized statements**.  
   - Human-written content contains **unpredictable, creative, and contextually unique** elements.  

The input will be in format of "Analyze this text: {DESIRE_TEXT}"
When you analyze all the information you need to output 
(1) AI generated or human written in format of "This text is likely to be: XXX"
(2) your confidence level in format of "confidence: xx%"
both output need to be in the same line and seperated by semicolon
`;

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const chatgpt = async (text: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze this text: "${text}"` },
      ],
    });

    return completion.choices[0].message.content || "";
  } catch (error) {
    console.error("Error in chatgpt function:", error);
    return "Error processing request.";
  }
};
