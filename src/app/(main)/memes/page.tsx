
import type { Metadata } from "next";
import { MemesContent } from "@/components/app/memes-content";

export const metadata: Metadata = {
  title: "Meme Center | Connect Hub",
  description: "Share and discover faith-based memes for encouragement and humor.",
};

export default function MemesPage() {
  return <MemesContent />;
}
