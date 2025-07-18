
import type { Metadata } from "next";
import { BibleContent } from "@/components/app/bible-content";

export const metadata: Metadata = {
  title: "Bible Study Tools | Connect Hub",
  description: "Read the Bible, explore topics, and ask questions with our AI-powered study assistant.",
};

export default function BiblePage() {
  return <BibleContent />;
}
