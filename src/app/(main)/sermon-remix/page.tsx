
import type { Metadata } from "next";
import { SermonRemixContent } from "@/components/app/sermon-remix-content";

export const metadata: Metadata = {
  title: "Sermon Remix | Connect Hub",
  description: "Create and share short clips from your favorite sermons.",
};

export default function SermonRemixPage() {
  return <SermonRemixContent />;
}
