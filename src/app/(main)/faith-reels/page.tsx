

import type { Metadata } from "next";
import { FaithReelsContent } from "@/components/app/faith-reels-content";

export const metadata: Metadata = {
  title: "Life Stories | Connect Hub",
  description: "Watch short, inspiring stories of life change and encouragement from the community.",
};

export default function LifeStoriesPage() {
  return <FaithReelsContent />;
}
