"use client";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Comment from "@/components/comment";

interface Review {
  content: string;
  head: string;
}

interface Product {
  title: string;
  price: number;
  rating: number;
  totalReviews: number;
  description: string;
  reviews: Review[];
  imageUrl: string;
}

interface ResultProps {
  url: string;
}

export default function Result({ url }: ResultProps) {
  const { data, error, isLoading } = useSWR<Product>(
    `/api/py/getQueryData?url=${url}`,
    fetcher,
  );

  if (error) return <div>Failed to load product data</div>;
  if (!data || isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Card className="w-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          Price = {data.price}
          <div>
            {data.reviews.map((review) => (
              <Comment
                key={review.content}
                header={review.head}
                content={review.content}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
