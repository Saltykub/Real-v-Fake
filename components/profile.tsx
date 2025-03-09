import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Profile({
  url,
  name,
  course,
}: {
  url: string;
  name: string;
  course: string;
}) {
  return (
    <div className="items-center flex flex-col">
      <Avatar className="w-20">
        <AvatarImage src={url} alt="@shadcn" className="rounded-full" />
        <AvatarFallback>RvF</AvatarFallback>
      </Avatar>
      <div className="mt-3">{name}</div>
      <div>{course}</div>
    </div>
  );
}
