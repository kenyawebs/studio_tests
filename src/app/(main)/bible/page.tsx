
import type { Metadata } from "next";
import { BibleContent } from "@/components/app/bible-content";

export const metadata: Metadata = {
  title: "Wisdom Texts | Connect Hub",
  description: "Explore ancient wisdom, find guidance for life's questions, and ask our AI assistant for insights.",
};

export default function BiblePage() {
  return <BibleContent />;
}
