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
  // const [result, setResult] = useState<boolean | null>(null);
  // const [ready, setReady] = useState<boolean | null>(null);
  // const classify = async (text: any) => {

  //     if (!text) return;
  //     if (ready === null) setReady(false);

  //     // Make a request to the /classify route on the server.
  //     const result = await fetch(`/hf?text=${encodeURIComponent(text)}`);

  //     // If this is the first time we've made a request, set the ready flag.
  //     if (!ready) setReady(true);

  //     const json = await result.json();
  //     setResult(json);
  // };

  // useEffect(() => {
  //     classify(content);
  // }, []);

  return (
    <Card className="mt-3">
      <CardHeader>
        <h2 className="text-xl font-bold">{header}</h2>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
