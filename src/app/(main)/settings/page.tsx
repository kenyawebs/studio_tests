
import type { Metadata } from "next";
import { SettingsContent } from "@/components/app/settings-content";

export const metadata: Metadata = {
    title: "Settings | Connect Hub",
    description: "Manage your profile, notification settings, and privacy options.",
};

/**
 * Renders the Settings page.
 *
 * This page allows users to manage their profile information, notification
 * preferences, and privacy settings. It renders the main `SettingsContent`
 * component.
 *
 * @returns {JSX.Element} The settings content component.
 */
export default function SettingsPage() {
    return <SettingsContent />;
}
