"use client";
import { useEffect, useState } from "react";
import { chatgpt } from "@/lib/utils";


export default function Temp2(content: string) {
  const [result, setResult] = useState<{ label: string; score: number } | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const detect = async (text: string) => {
    setLoading(true);
    try {
      const response = await chatgpt(text);
      setResult(extractAIClassification(response));
    } catch (error) {
      console.error("Error fetching classification:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };
  const extractAIClassification = (response: string) => {
    // Define regex patterns for classification and confidence score
    const classificationMatch = response.match(
      /(?:likely to be: )?(human written|AI)/i,
    );
    const confidenceMatch = response.match(/confidence: (\d{1,3})%/);

    // Extract values or return defaults
    const classification = classificationMatch
      ? classificationMatch[1]
      : "Unknown";
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1], 10) : 0;

    return { label: classification, score: confidence };
  };
  useEffect(() => {
    detect(content);
  }, [content]);

  return (
    <div>
      <div>
        {result ? result.label : "result not found"}
        {result ? result.score : "resutl not found"}
      </div>
    </div>
  );
}
