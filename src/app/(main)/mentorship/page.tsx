
import type { Metadata } from "next";
import { MentorshipContent } from "@/components/app/mentorship-content";

export const metadata: Metadata = {
  title: "Mentorship | Connect Hub",
  description: "Connect with experienced leaders who can guide you on your faith journey.",
};

export default function MentorshipPage() {
  return <MentorshipContent />;
}
