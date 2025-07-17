import type { Metadata } from "next";
import { SocialFeedContent } from "@/components/app/social-feed-content";

export const metadata: Metadata = {
  title: "Testimony & Milestone Feed | Connect Hub",
  description: "Share life-changing testimonies, spiritual milestones, and encouraging updates. A space for authentic spiritual transformation stories.",
  keywords: "testimonies, spiritual growth, faith stories, Christian community, spiritual transformation, life changes",
};

export default function SocialFeedPage() {
    return <SocialFeedContent />;
}
