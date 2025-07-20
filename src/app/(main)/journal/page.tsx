
import type { Metadata } from "next";
import { PersonalJournalContent } from "@/components/app/personal-journal-content";

export const metadata: Metadata = {
  title: "Personal Journal | Connect Hub",
  description: "Privately log or publicly share life reflections, dreams, and personal insights with the community.",
};

export default function PersonalJournalPage() {
  return <PersonalJournalContent />;
}
