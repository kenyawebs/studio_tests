
import type { Metadata } from "next";
import { MemesContent } from "@/components/app/memes-content";

export const metadata: Metadata = {
  title: "Meme Center | Connect Hub",
  description: "Share and discover faith-based memes for encouragement and humor.",
};

/**
 * Renders the Meme Center page.
 *
 * This page provides a dedicated space for users to share and discover
 * faith-based memes for encouragement and humor. It renders the main
 * `MemesContent` component.
 *
 * @returns {JSX.Element} The memes content component.
 */
export default function MemesPage() {
  return <MemesContent />;
}
