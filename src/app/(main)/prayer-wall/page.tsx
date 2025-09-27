
import type { Metadata } from "next";
import { CommunityWallContent } from "@/components/app/community-wall-content";

export const metadata: Metadata = {
  title: "Community Wall | Connect Hub",
  description: "Share life's challenges and celebrate victories with the community. Lift each other up.",
};

/**
 * Renders the Community Wall page, aliased as Prayer Wall.
 *
 * This page provides a space for community members to share life's
 * challenges and victories, fostering a supportive environment. It serves
 * as the main entry point for the `/prayer-wall` route.
 *
 * @returns {JSX.Element} The community wall content component.
 */
export default function CommunityWallPage() {
    return <CommunityWallContent />;
}
