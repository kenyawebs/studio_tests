
import type { Metadata } from "next";
import { WisdomTextsContent } from "@/components/app/wisdom-texts-content";

export const metadata: Metadata = {
  title: "Wisdom Texts | Connect Hub",
  description: "Explore ancient wisdom, find guidance for life's questions, and ask our AI assistant for insights.",
};

/**
 * Renders the Wisdom Texts page.
 *
 * This page serves as the main entry point for the "Wisdom Texts" feature,
 * which is aliased as the `/bible` route. It displays the content related
 * to exploring ancient scriptures and interacting with the AI assistant
 * for insights.
 *
 * @returns {JSX.Element} The Wisdom Texts content component.
 */
export default function WisdomTextsPage() {
  return <WisdomTextsContent />;
}
