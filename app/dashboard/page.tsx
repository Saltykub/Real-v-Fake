"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import Result from "@/components/result";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const platforms = ["Amazon", "Lazada", "Shopee", "TikTokShop", "Etsy", "Other"];

const strokeColorsPrimary: Record<string, string> = {
  green: "stroke-green-500",
  lime: "stroke-lime-500",
  yellow: "stroke-yellow-500",
  orange: "stroke-orange-500",
  red: "stroke-red-500",
  gray: "stroke-gray-500",
};

const strokeColorsSecondary: Record<string, string> = {
  green: "stroke-green-200",
  lime: "stroke-lime-200",
  yellow: "stroke-yellow-200",
  orange: "stroke-orange-200",
  red: "stroke-red-200",
  gray: "stroke-gray-200",
};

const textColors: Record<string, string> = {
  green: "text-green-600",
  lime: "text-lime-600",
  yellow: "text-yellow-600",
  orange: "text-orange-600",
  red: "text-red-600",
  gray: "text-gray-600",
};


export default function Dashboard() {
  const supabase = createClient();
  const [platform, setPlatform] = useState<string | null>(null);
  const [detect, setDetect] = useState<boolean>(false);
  const [productLink, setProductLink] = useState<string | null>(null);
  const [reportedShop, setReportedShop] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [color, setColor] = useState<string>("gray");
  const [added, setAdded] = useState<boolean>(false);
  const [queryLink, setQueryLink] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQueryLink(params.get("link") || "");
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(data.session?.user.id ?? null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (result !== null) {
      if (result >= 0.8) setColor("green");
      else if (result >= 0.6) setColor("lime");
      else if (result >= 0.4) setColor("yellow");
      else if (result >= 0.2) setColor("orange");
      else setColor("red");
    } else {
      setColor("gray"); // Default color if result is null
    }
  }, [result]); // Runs every time result changes

  async function handleDetect(formData: FormData) {
    const shop = formData.get("shop") as string;
    const link = formData.get("link") as string;

    console.log("Detecting:", { platform, link });
    // Add your API call here
    setDetect(true);
    setProductLink(link);
    setReportedShop(shop);
  }

  async function handleReport(formData: FormData) {
    const shop = formData.get("shop") as string;
    const link = formData.get("link") as string;
    const description = formData.get("description") as string;

    console.log("Reporting:", { shop, platform, link, description }, user);
    const { error } = await supabase.from("reports").insert({
      user: user,
      shop: shop,
      platform: platform,
      link: link,
      confidence: 0,
    });
    if (!error) toast.success("Fake shop has been reported. Thank You!");
  }

  function doneDetect() {
    setDetect(false);
    setPlatform(null);
    setProductLink(null);
    setReportedShop(null);
    setResult(null);
    setAdded(false);
  }

  async function addToSupabase() {
    const { error } = await supabase.from("reports").insert({
      user: user,
      shop: reportedShop,
      platform: platform,
      link: productLink,
      confidence: result,
    });
    if (!error) {
      toast.success("Fake shop has been reported. Thank You!");
      setAdded(true);
    }
    else {
      toast.error("Error!");
    }
  }

  return (
    <div className="mt-4 w-screen mx-auto flex flex-col items-center lg:flex-row lg:items-start lg:justify-around">
      <div className="flex flex-col gap-4 px-4 lg:px-0 lg:w-1/3 max-w-[450px]">
        <div className={cn(detect && "cursor-not-allowed opacity-60")}>
          <Tabs defaultValue="detect" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger disabled={detect} value="detect">
                Detect
              </TabsTrigger>
              <TabsTrigger disabled={detect} value="report">
                Report
              </TabsTrigger>
            </TabsList>

            {/* Fake Shop Detection */}
            <TabsContent value="detect">
              <Card>
                <CardHeader>
                  <CardTitle>Fake Shop Detection</CardTitle>
                  <CardDescription>
                    Input the link to the product on any online shopping
                    platform to check the reliability of the shop.
                  </CardDescription>
                </CardHeader>
                <form action={handleDetect}>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="shop">Shop Name</Label>
                      <Input
                        id="shop"
                        name="shop"
                        type="text"
                        placeholder="Enter shop name"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="platform">Platform</Label>
                      <Select disabled={detect} onValueChange={setPlatform} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Which platform?" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem key={platform} value={platform}>
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="link">Link</Label>
                      <Input
                        defaultValue={queryLink}
                        disabled={detect}
                        id="link"
                        name="link"
                        type="url"
                        placeholder="Enter link to product"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <SubmitButton
                      disabled={detect}
                      pendingText="Loading..."
                      className="w-full"
                    >
                      Check
                    </SubmitButton>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Report Fake Shop */}
            <TabsContent value="report">
              <Card>
                <CardHeader>
                  <CardTitle>Report Fake Shop</CardTitle>
                  <CardDescription>
                    Expose the fake shop to help our community!
                  </CardDescription>
                </CardHeader>
                <form action={handleReport}>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="shop">Shop Name</Label>
                      <Input
                        id="shop"
                        name="shop"
                        type="text"
                        placeholder="Enter shop name"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="platform">Platform</Label>
                      <Select onValueChange={setPlatform} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Which platform?" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem key={platform} value={platform}>
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="link">Link</Label>
                      <Input
                        id="link"
                        name="link"
                        type="url"
                        placeholder="Enter link to shop/product"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        type="text"
                        placeholder="What happened?"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <SubmitButton pendingText="Loading..." className="w-full">
                      Report
                    </SubmitButton>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Card className={cn(detect ? "flex flex-col justify-center items-center w-full" : "hidden")}>
          <CardHeader>
            <CardTitle>Checking Results</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="relative size-40 w-full mb-6">
            <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              {/* Background Circle */}
              <circle 
                cx="18" 
                cy="18" 
                r="16" 
                fill="none" 
                className={cn(strokeColorsSecondary[color])} 
                strokeWidth="1" 
                strokeDasharray="75 100" 
                strokeLinecap="round"
              ></circle>

              {/* Foreground Circle (Progress) */}
              {result && (
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  className={cn(strokeColorsPrimary[color])} 
                  strokeWidth="2" 
                  strokeDasharray={`${75 * result} 100`} 
                  strokeLinecap="round"
                ></circle>
              )}
            </svg>

          {/* Text Centered */}
            <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className={cn(
                "text-4xl font-bold", 
                result ? `text-${color}-600` : "text-gray-600 text-base"
              )}>
                {result ? (result * 100).toFixed(2) : "Calculating..."}
              </span>
              {result ? (
                <span className={cn(`text-${color}-600 block`)}>Score</span>
              ) : null}
            </div>
            <p className="text-gray-600 text-sm">How reliable the shop is.</p>
          </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 w-full">
            <Button onClick={doneDetect} variant="outline" className="w-full">Back</Button>
            <Button onClick={addToSupabase} disabled={added} className="w-full relative font-bold">
              {!added ?
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span> : null}
              Add to community
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className={cn(detect ? "block" : "hidden", "lg:w-1/2")}>
        {detect && productLink && <Result url={productLink} setResult={setResult} />}
      </div>
    </div>
  );
}
