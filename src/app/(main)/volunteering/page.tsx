
import type { Metadata } from "next";
import { VolunteeringContent } from "@/components/app/volunteering-content";

export const metadata: Metadata = {
  title: "Volunteer Board | Connect Hub",
  description: "Find or post opportunities to serve and use your gifts for the kingdom.",
};

export default function VolunteeringPage() {
  return <VolunteeringContent />;
}
