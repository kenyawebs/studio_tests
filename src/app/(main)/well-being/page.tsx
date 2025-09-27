
import type { Metadata } from "next";
import { WellBeingContent } from "@/components/app/well-being-content";

export const metadata: Metadata = {
  title: "Well-being Hub | Connect Hub",
  description: "Caring for your soul and mind is vital. Find resources to support your journey towards wholeness.",
};

/**
 * Renders the Well-being Hub page.
 *
 * This page provides resources and tools to support users on their journey
 * towards mental, emotional, and spiritual wholeness. It renders the main
 * `WellBeingContent` component.
 *
 * @returns {JSX.Element} The well-being content component.
 */
export default function WellBeingPage() {
  return <WellBeingContent />;
}
