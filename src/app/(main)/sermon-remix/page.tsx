
import type { Metadata } from "next";
import { SermonRemixContent } from "@/components/app/sermon-remix-content";

export const metadata: Metadata = {
  title: "Sermon Remix | Connect Hub",
  description: "Create and share short clips from your favorite sermons.",
};

/**
 * Renders the Sermon Remix page.
 *
 * This page provides tools for users to create and share short, impactful
 * clips from their favorite sermons, fostering a creative and engaging
 * way to spread wisdom. It renders the main `SermonRemixContent` component.
 *
 * @returns {JSX.Element} The sermon remix content component.
 */
export default function SermonRemixPage() {
  return <SermonRemixContent />;
}
