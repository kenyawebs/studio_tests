
import type { Metadata } from "next";
import { MentorshipContent } from "@/components/app/mentorship-content";

export const metadata: Metadata = {
  title: "Life Mentoring | Connect Hub",
  description: "Connect with experienced mentors who can guide you on your personal growth journey.",
};

export default function MentorshipPage() {
  return <MentorshipContent />;
}
