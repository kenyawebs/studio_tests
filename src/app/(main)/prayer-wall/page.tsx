
import type { Metadata } from "next";
import { PrayerWallContent } from "@/components/app/prayer-wall-content";

export const metadata: Metadata = {
  title: "Community Wall | Connect Hub",
  description: "Share life's challenges and celebrate victories with the community. Lift each other up.",
};

export default function PrayerWallPage() {
    return <PrayerWallContent />;
}
