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

const platforms = ["Amazon", "Lazada", "Shopee", "TikTokShop", "Etsy", "Other"];

export default function Dashboard(props: { searchParams: Promise<Message> }) {
  const supabase = createClient();
  const [platform, setPlatform] = useState<string>("");
  const [detect, setDetect] = useState<boolean>(false);
  const [productLink, setProductLink] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

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

  async function handleDetect(formData: FormData) {
    const link = formData.get("link") as string;

    console.log("Detecting:", { platform, link });
    // Add your API call here
    setDetect(true);
    setProductLink(link);
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
                      <Label htmlFor="platform">Platform</Label>
                      <Select disabled={detect} onValueChange={setPlatform}>
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
                      <Select onValueChange={setPlatform}>
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
        <div className={cn(detect ? "block" : "hidden")}>Hi, result here</div>
      </div>
      <div className={cn(detect ? "block" : "hidden", "lg:w-1/2")}>
        {detect && productLink && <Result url={productLink} />}
      </div>
    </div>
  );
}
