import type { Metadata } from "next";
import { SocialFeedContent } from "@/components/app/social-feed-content";

export const metadata: Metadata = {
  title: "Testimony & Milestone Feed | Connect Hub",
  description: "Share life-changing testimonies, spiritual milestones, and encouraging updates. A space for authentic spiritual transformation stories.",
  keywords: "testimonies, spiritual growth, faith stories, Christian community, spiritual transformation, life changes",
};

/**
 * Renders the Social Feed page for testimonies and milestones.
 *
 * This page provides a dedicated feed for users to share and view
 * life-changing testimonies, spiritual milestones, and other encouraging
 * updates. It serves as a space for authentic stories of spiritual
 * transformation.
 *
 * @returns {JSX.Element} The social feed content component.
 */
export default function SocialFeedPage() {
    return <SocialFeedContent />;
}
