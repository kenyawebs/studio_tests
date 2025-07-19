
import type { Metadata } from "next";
import { LifeMentoringContent } from "@/components/app/life-mentoring-content";

export const metadata: Metadata = {
  title: "Life Mentoring | Connect Hub",
  description: "Connect with experienced mentors who can guide you on your personal growth journey.",
};

export default function LifeMentoringPage() {
  return <LifeMentoringContent />;
}
