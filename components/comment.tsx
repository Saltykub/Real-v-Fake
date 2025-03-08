"use client";

import { chatgpt, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState, useEffect } from "react";
import { Bot } from "lucide-react";

const statusColors = (c: string): string | null => {
  let ret = null;
  if (c == "5 stars") ret = "bg-green-500 ring-green-300";
  else if (c == "4 stars") ret = "bg-lime-500 ring-lime-300";
  else if (c == "3 stars") ret = "bg-yellow-500 ring-yellow-300";
  else if (c == "2 stars") ret = "bg-orange-500 ring-orange-300";
  else ret = "bg-red-500 ring-red-300";
  return ret;
};

const toneColors = (c: string): string | null => {
  let ret = null;
  if (c == "POSITIVE") ret = "bg-green-100 text-green-700 ring-green-600/20";
  else ret = "bg-red-100 text-red-700 ring-red-600/20";
  return ret;
};

export default function Comment({
  header,
  content,
}: {
  header: string;
  content: string;
}) {
  const [result, setResult] = useState<
    { label: string; score: number }[] | null
  >(null);
  const [result2, setResult2] = useState<
    { label: string; score: number }[] | null
  >(null);
  const [result3, setResult3] = useState<{
    label: string;
    score: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [loading3, setLoading3] = useState<boolean>(false);

  const detect = async (text: string) => {
    setLoading3(true);
    try {
      const response = await chatgpt(text);
      setResult3(extractAIClassification(response));
    } catch (error) {
      console.error("Error fetching classification:", error);
      setResult(null);
    } finally {
      setLoading3(false);
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

  // Function to classify the content
  const classify = async (text: string) => {
    if (!text) return;
    setLoading(true);

    try {
      const response = await fetch(`/hf?text=${encodeURIComponent(text)}`);
      const json = await response.json();
      setResult(json); // Store the result
    } catch (error) {
      console.error("Error fetching classification:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };
  const classify2 = async (text: string) => {
    if (!text) return;
    setLoading2(true);
    try {
      const response = await fetch(`/hf2?text=${encodeURIComponent(text)}`);
      const json = await response.json();
      setResult2(json); // Store the result
    } catch (error) {
      console.error("Error fetching classification:", error);
      setResult2(null);
    } finally {
      setLoading2(false);
    }
  };
  // Automatically classify content when component mounts or content changes
  useEffect(() => {
    classify(content);
    classify2(content);
    detect(content);
  }, [content]);

  return (
    <li className="text-left mb-10">
      <div className="flex flex-row items-stretch">
        <div className="flex flex-col items-center justify-start mr-5">
          <div
            className={cn(
              "flex items-center justify-center size-8 rounded-full text-white border-4 border-white text-md font-semibold",
              result && statusColors(result[0].label) + " animate-bounce ring",
            )}
          >
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              result && result[0].label.split(" ")[0]
            )}
          </div>

          <div className="flex flex-col mt-2 lg:mt-4">
            <div className="text-gray-500">
              <span
                className={cn(
                  "inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium",
                  !loading2 && result2 && toneColors(result2[0].label),
                )}
              >
                {loading2 ? "LOADING" : result2 && result2[0].label}
              </span>
            </div>

            {!loading3 && result3 && result3.label === "AI" ? (
              <div className="mt-3 text-purple-700">
                <span
                  className={cn(
                    "w-full inline-flex items-center justify-center rounded-xl px-2 py-1 text-xs font-medium bg-purple-100",
                    !loading3 && result3 && result3.label === "AI",
                  )}
                >
                  <Bot size={16} />
                  &nbsp;{result3.score}%
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-3 rounded-xl w-full flex-shrink">
          <h4 className="text-lg leading-6 font-semibold text-gray-900">
            {header}
          </h4>
          <p className="mt-2 text-base leading-6 text-gray-500">{content}</p>
        </div>
      </div>
    </li>
  );
}
