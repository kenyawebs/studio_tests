
"use client";

import React, { useState, useTransition, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { updatePrayerCount } from "@/lib/firestore";
import { useAuth } from "@/hooks/use-auth";

/**
 * Renders a stateful, interactive "Pray" button.
 *
 * This component allows authenticated users to "pray" for a specific item,
 * identified by `prayerId`. It displays the current prayer count and a heart
 * icon that fills in when the user clicks it.
 *
 * Key features:
 * - **Real-time Count**: Listens for real-time updates to the prayer count from
 *   Firestore using a snapshot listener.
 * - **Client-side Persistence**: Remembers a user's "prayed" status for an item
 *   using `localStorage` to prevent multiple prayers from the same user on the
 *   same device and maintain the UI state across page loads.
 * - **Optimistic UI**: The UI updates immediately upon clicking, providing instant
 *   feedback to the user while the backend update is processed.
 * - **Backend Update**: Triggers a server function (`updatePrayerCount`) to
 *   increment or decrement a distributed counter in Firestore, ensuring scalability.
 *
 * @param {{prayerId: string; count: number}} props - The props for the component.
 * @param {string} props.prayerId - The unique identifier of the prayer request.
 * @param {number} props.count - The initial prayer count to display.
 * @returns {JSX.Element} The pray button component.
 */
export function PrayButton({ prayerId, count }: { prayerId: string, count: number }) {
  const { user } = useAuth();
  const [isPrayed, setIsPrayed] = useState(false);
  const [prayCount, setPrayCount] = useState(count || 0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Check local storage to see if user has already prayed for this item
    const prayedStatus = localStorage.getItem(`prayed_${prayerId}`);
    if (prayedStatus === 'true') {
      setIsPrayed(true);
    }
  }, [prayerId]);

  useEffect(() => {
    if (!prayerId) return;
    
    const prayerRequestRef = doc(db, "prayerRequests", prayerId);
    
    const unsub = onSnapshot(prayerRequestRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            setPrayCount(data.prayCount || 0);
        }
    });

    return () => unsub();
  }, [prayerId]);


  const handleClick = () => {
    // A user must be logged in to pray.
    if (isPending || !user) return;

    startTransition(() => {
      const newPrayedState = !isPrayed;
      setIsPrayed(newPrayedState);
      
      localStorage.setItem(`prayed_${prayerId}`, String(newPrayedState));

      // Trigger the distributed counter extension
      updatePrayerCount(prayerId, newPrayedState ? 1 : -1);
    });
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className="rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50"
        aria-label="Pray for this"
        disabled={isPending || !user}
      >
        <Heart
          className={cn(
            "w-5 h-5 text-muted-foreground transition-all",
            isPrayed && "text-destructive fill-destructive animate-heart-pop"
          )}
        />
      </Button>
      <span className="text-sm text-muted-foreground tabular-nums min-w-[2ch] text-left">
        {prayCount}
      </span>
    </div>
  );
}
