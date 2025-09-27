
import type { Metadata } from "next";
import { PersonalJournalContent } from "@/components/app/personal-journal-content";

export const metadata: Metadata = {
  title: "Personal Journal | Connect Hub",
  description: "Privately log or publicly share life reflections, dreams, and personal insights with the community.",
};

/**
 * Renders the Personal Journal page.
 *
 * This page serves as the entry point for the personal journaling feature,
 * allowing users to privately log or publicly share their reflections,
 * dreams, and insights. It renders the main `PersonalJournalContent`
 * component.
 *
 * @returns {JSX.Element} The personal journal content component.
 */
export default function PersonalJournalPage() {
  return <PersonalJournalContent />;
}
