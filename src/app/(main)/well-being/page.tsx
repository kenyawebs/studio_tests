
import type { Metadata } from "next";
import { WellBeingContent } from "@/components/app/well-being-content";

export const metadata: Metadata = {
  title: "Well-being Hub | Connect Hub",
  description: "Caring for your soul and mind is vital. Find resources to support your journey towards wholeness.",
};

export default function WellBeingPage() {
  return <WellBeingContent />;
}
