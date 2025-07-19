
import type { Metadata } from "next";
import { CommunityWallContent } from "@/components/app/community-wall-content";

export const metadata: Metadata = {
  title: "Community Wall | Connect Hub",
  description: "Share life's challenges and celebrate victories with the community. Lift each other up.",
};

export default function CommunityWallPage() {
    return <CommunityWallContent />;
}
