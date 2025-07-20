
import type { Metadata } from "next";
import { LifeStoriesContent } from "@/components/app/life-stories-content";

export const metadata: Metadata = {
  title: "Life Stories | Connect Hub",
  description: "Watch short, inspiring stories of life change and encouragement from the community.",
};

export default function LifeStoriesPage() {
  return <LifeStoriesContent />;
}
