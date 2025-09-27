
import type { Metadata } from "next";
import { WisdomTextsContent } from "@/components/app/wisdom-texts-content";

export const metadata: Metadata = {
  title: "Wisdom Texts | Connect Hub",
  description: "Explore ancient wisdom, find guidance for life's questions, and ask our AI assistant for insights.",
};

/**
 * Renders the Wisdom Texts page.
 *
 * This page allows users to explore ancient wisdom, find guidance for
 * life's questions, and interact with an AI assistant for insights.
 * It renders the main `WisdomTextsContent` component.
 *
 * @returns {JSX.Element} The wisdom texts content component.
 */
export default function WisdomTextsPage() {
  return <WisdomTextsContent />;
}
