
import type { Metadata } from "next";
import { LifeMentoringContent } from "@/components/app/life-mentoring-content";

export const metadata: Metadata = {
  title: "Life Mentoring | Connect Hub",
  description: "Connect with experienced mentors who can guide you on your personal growth journey.",
};

/**
 * Renders the Life Mentoring page.
 *
 * This page provides a platform for users to connect with experienced
 * mentors who can guide them on their personal and spiritual growth
 * journeys. It renders the main `LifeMentoringContent` component.
 *
 * @returns {JSX.Element} The life mentoring content component.
 */
export default function LifeMentoringPage() {
  return <LifeMentoringContent />;
}
