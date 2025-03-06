import Features from "@/components/features";
import Landing from "@/components/landing";
import Review from "@/components/review";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  return (
    <div className="relative w-full">
      <Landing />
      <Features />
      <Review />
    </div>
  );
}
