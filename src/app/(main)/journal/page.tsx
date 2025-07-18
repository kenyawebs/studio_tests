
import type { Metadata } from "next";
import { JournalContent } from "@/components/app/journal-content";

export const metadata: Metadata = {
  title: "Dreams & Visions Journal | Connect Hub",
  description: "Privately log or publicly share dreams, visions, and prophetic impressions with the community.",
};

export default function JournalPage() {
  return <JournalContent />;
}
