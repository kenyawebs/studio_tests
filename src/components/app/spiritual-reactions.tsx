
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { togglePostReaction, type SpiritualReaction } from "@/lib/firestore";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface SpiritualReactionsProps {
    postId: string;
    reactions: {
        praying: number;
        believing: number;
        encouraging: number;
        inspired: number;
    };
    userReaction?: SpiritualReaction;
}

export function SpiritualReactions({ postId, reactions, userReaction }: SpiritualReactionsProps) {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [currentUserReaction, setCurrentUserReaction] = useState<SpiritualReaction | undefined>(userReaction);

    const handleReaction = (reactionType: SpiritualReaction) => {
        if (!user) {
            toast({
                title: "Please log in",
                description: "You need to be logged in to react to posts.",
                variant: "destructive"
            });
            return;
        }

        startTransition(async () => {
            try {
                await togglePostReaction(postId, user.uid, reactionType);
                
                // Update local state for immediate feedback
                setCurrentUserReaction(
                    currentUserReaction === reactionType ? undefined : reactionType
                );
                
                // Show appropriate toast
                const messages = {
                    praying: "🙏 You're praying for this",
                    believing: "💪 You believe God will come through",
                    encouraging: "🤗 You're encouraged by this",
                    inspired: "✨ You're inspired by this testimony"
                };
                
                toast({
                    title: messages[reactionType],
                    description: "Your spiritual response has been shared"
                });
                
            } catch (error) {
                console.error("Error updating reaction:", error);
                toast({
                    title: "Error",
                    description: "Could not update your reaction. Please try again.",
                    variant: "destructive"
                });
            }
        });
    };

    const reactionButtons = [
        {
            type: 'praying' as SpiritualReaction,
            icon: '🙏',
            label: 'Praying',
            count: reactions?.praying || 0,
            activeColor: 'text-purple-600 bg-purple-50 border-purple-200',
            hoverColor: 'hover:bg-purple-50 hover:text-purple-600'
        },
        {
            type: 'believing' as SpiritualReaction,
            icon: '💪',
            label: 'Believing',
            count: reactions?.believing || 0,
            activeColor: 'text-green-600 bg-green-50 border-green-200',
            hoverColor: 'hover:bg-green-50 hover:text-green-600'
        },
        {
            type: 'encouraging' as SpiritualReaction,
            icon: '🤗',
            label: 'Encouraging',
            count: reactions?.encouraging || 0,
            activeColor: 'text-orange-600 bg-orange-50 border-orange-200',
            hoverColor: 'hover:bg-orange-50 hover:text-orange-600'
        },
        {
            type: 'inspired' as SpiritualReaction,
            icon: '✨',
            label: 'Inspired',
            count: reactions?.inspired || 0,
            activeColor: 'text-purple-600 bg-purple-50 border-purple-200',
            hoverColor: 'hover:bg-purple-50 hover:text-purple-600'
        }
    ];

    return (
        <div className="flex justify-around w-full gap-1">
            {reactionButtons.map((button) => (
                <Button
                    key={button.type}
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "flex items-center gap-1.5 transition-all duration-200 rounded-full border border-transparent",
                        button.hoverColor,
                        currentUserReaction === button.type && button.activeColor
                    )}
                    onClick={() => handleReaction(button.type)}
                    disabled={isPending}
                >
                    <span className="text-sm">{button.icon}</span>
                    <span className="text-xs font-medium hidden sm:inline">{button.label}</span>
                    {button.count > 0 && (
                        <span className="text-xs text-muted-foreground tabular-nums min-w-[1ch]">
                            {button.count}
                        </span>
                    )}
                </Button>
            ))}
        </div>
    );
}
