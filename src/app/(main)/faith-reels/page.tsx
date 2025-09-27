
import type { Metadata } from "next";
import { LifeStoriesContent } from "@/components/app/life-stories-content";

export const metadata: Metadata = {
  title: "Life Stories | Connect Hub",
  description: "Watch short, inspiring stories of life change and encouragement from the community.",
};

/**
 * Renders the Life Stories / Faith Reels page.
 *
 * This page displays short, inspiring video stories of life change and
 * encouragement from within the community. It serves as the main entry
 * point for the `/faith-reels` route, rendering the `LifeStoriesContent`
 * component.
 *
 * @returns {JSX.Element} The life stories content component.
 */
export default function LifeStoriesPage() {
  return <LifeStoriesContent />;
}
