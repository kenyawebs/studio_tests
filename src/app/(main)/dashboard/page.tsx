
import type { Metadata } from "next";
import { DashboardContent } from "@/components/app/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | Connect Hub",
  description: "Your personalized spiritual hub, buzzing with activity.",
};

/**
 * Renders the main dashboard page.
 *
 * This page serves as the user's personalized spiritual hub, displaying
 * relevant activities and information. It renders the main
 * `DashboardContent` component.
 *
 * @returns {JSX.Element} The dashboard content component.
 */
export default function DashboardPage() {
    return <DashboardContent />;
}
