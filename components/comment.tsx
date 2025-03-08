"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState, useEffect } from "react";

export default function Comment({
  header,
  content,
}: {
  header: string;
  content: string;
}) {
    const [result, setResult] = useState<{label:string; score:number}[]|null>(null);
    const [result2, setResult2] = useState<{label:string; score:number}[]|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loading2, setLoading2] = useState<boolean>(true);
  
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
    const classify2 = async (text:string) => {
        if(!text) return;
        setLoading2(true)
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
    }
    // Automatically classify content when component mounts or content changes
    useEffect(() => {
      classify(content);
      classify2(content);
    }, [content]);

  return (
    <Card className="mt-3">
      <CardHeader>
        <h2 className="text-xl font-bold">{header}</h2>
      </CardHeader>
      <CardContent>
        {content}
        <div className="mt-4 text-gray-500">
          {loading ? "Classifying..." : result ? `Classification: ${result[0].label}` : "No result"}
        </div>
        <div className="mt-4 text-gray-500">
          {loading2 ? "Classifying..." : result2 ? `Tone: ${result2[0].label}` : "No result"}
        </div>
      </CardContent>
      
    </Card>
  );
}
