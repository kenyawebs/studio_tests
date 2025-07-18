
import type { Metadata } from "next";
import { GivingContent } from "@/components/app/giving-content";

export const metadata: Metadata = {
  title: "Giving | Connect Hub",
  description: "Support the mission with secure online giving. Your generosity makes a difference.",
};

export default function GivingPage() {
  return <GivingContent />;
}
