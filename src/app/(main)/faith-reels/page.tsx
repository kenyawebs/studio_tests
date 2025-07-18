
import type { Metadata } from "next";
import { FaithReelsContent } from "@/components/app/faith-reels-content";

export const metadata: Metadata = {
  title: "Faith Reels | Connect Hub",
  description: "Share and watch short, inspiring videos from the community.",
};

export default function FaithReelsPage() {
  return <FaithReelsContent />;
}
