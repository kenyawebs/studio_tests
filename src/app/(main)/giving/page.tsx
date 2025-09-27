
import type { Metadata } from "next";
import { GivingContent } from "@/components/app/giving-content";

export const metadata: Metadata = {
  title: "Giving | Connect Hub",
  description: "Support the mission with secure online giving. Your generosity makes a difference.",
};

/**
 * Renders the Giving page.
 *
 * This page provides the interface for users to make secure online donations
 * and support the community's mission. It renders the main `GivingContent`
 * component.
 *
 * @returns {JSX.Element} The giving content component.
 */
export default function GivingPage() {
  return <GivingContent />;
}
