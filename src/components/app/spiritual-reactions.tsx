
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

export function SpiritualReactions({ postId, reactions: initialReactions, userReaction }: SpiritualReactionsProps) {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [localReactions, setLocalReactions] = useState(initialReactions || { praying: 0, believing: 0, encouraging: 0, inspired: 0 });
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
            const wasReacted = currentUserReaction === reactionType;
            const previousReaction = currentUserReaction;

            // Optimistic UI update
            setCurrentUserReaction(wasReacted ? undefined : reactionType);
            setLocalReactions(prev => {
                const newReactions = { ...prev };
                if (previousReaction && !wasReacted) {
                    newReactions[previousReaction] = Math.max(0, newReactions[previousReaction] - 1);
                }
                if (wasReacted) {
                     newReactions[reactionType] = Math.max(0, newReactions[reactionType] - 1);
                } else {
                    newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
                }
                return newReactions;
            });

            try {
                await togglePostReaction(postId, user.uid, reactionType);
                
                if (!wasReacted) {
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
                }
                
            } catch (error) {
                console.error("Error updating reaction:", error);
                // Revert optimistic UI update on failure
                 setCurrentUserReaction(previousReaction);
                 setLocalReactions(initialReactions);
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
            activeColor: 'text-purple-600 bg-purple-50 border-purple-200',
            hoverColor: 'hover:bg-purple-50 hover:text-purple-600'
        },
        {
            type: 'believing' as SpiritualReaction,
            icon: '💪',
            label: 'Believing',
            activeColor: 'text-green-600 bg-green-50 border-green-200',
            hoverColor: 'hover:bg-green-50 hover:text-green-600'
        },
        {
            type: 'encouraging' as SpiritualReaction,
            icon: '🤗',
            label: 'Encouraging',
            activeColor: 'text-orange-600 bg-orange-50 border-orange-200',
            hoverColor: 'hover:bg-orange-50 hover:text-orange-600'
        },
        {
            type: 'inspired' as SpiritualReaction,
            icon: '✨',
            label: 'Inspired',
            activeColor: 'text-purple-600 bg-purple-50 border-purple-200',
            hoverColor: 'hover:bg-purple-50 hover:text-purple-600'
        }
    ];

    return (
        <div className="flex justify-around w-full gap-1">
            {reactionButtons.map((button) => {
                const count = localReactions[button.type] || 0;
                return (
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
                        {count > 0 && (
                            <span className="text-xs text-muted-foreground tabular-nums min-w-[1ch]">
                                {count}
                            </span>
                        )}
                    </Button>
                )
            })}
        </div>
    );
}
