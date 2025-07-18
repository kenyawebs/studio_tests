
"use client";

import { useState, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
    MessageCircle, 
    Share2, 
    Image as ImageIcon, 
    Video, 
    Filter, 
    MoreHorizontal, 
    Sparkles, 
    Loader2
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { createSocialPost, getSocialFeedPosts, Post } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { DocumentSnapshot } from "firebase/firestore";
import { SpiritualReactions } from "./spiritual-reactions";

const POSTS_PER_PAGE = 5;

// Helper function to get category color and icon
const getCategoryDisplay = (category: string) => {
    const categoryMap = {
        breakthrough: { color: 'bg-green-100 text-green-800', icon: '🎯', label: 'Breakthrough' },
        healing: { color: 'bg-blue-100 text-blue-800', icon: '🌿', label: 'Healing' },
        provision: { color: 'bg-yellow-100 text-yellow-800', icon: '🙏', label: 'Provision' },
        restoration: { color: 'bg-purple-100 text-purple-800', icon: '🔄', label: 'Restoration' },
        calling: { color: 'bg-orange-100 text-orange-800', icon: '📞', label: 'Calling' },
        growth: { color: 'bg-gray-100 text-gray-800', icon: '🌱', label: 'Growth' }
    };
    
    return categoryMap[category as keyof typeof categoryMap] || categoryMap.growth;
};

const PostSkeleton = () => (
    <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
            <Card key={i}>
                <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1.5">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-2 space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter className="p-2 border-t">
                    <div className="flex justify-around w-full">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-8 w-20" />
                        ))}
                    </div>
                </CardFooter>
            </Card>
        ))}
    </div>
);

const EmptyFeed = ({ tab }: { tab: string }) => {
    const messages = {
        all: "The feed is quiet... for now",
        breakthroughs: "No breakthroughs shared yet",
        questions: "No questions asked yet",
        testimonies: "No testimonies shared yet"
    };
    
    return (
        <div className="text-center py-12 text-muted-foreground">
            <Sparkles className="mx-auto h-12 w-12" />
            <h3 className="mt-2 text-lg font-medium">{messages[tab as keyof typeof messages] || messages.all}</h3>
            <p className="text-sm">Be the first to share something meaningful!</p>
        </div>
    );
};

export function SocialFeedContent() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [newPost, setNewPost] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    // Pagination state
    const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        loadPosts(true);
    }, []);

    const loadPosts = async (fromStart = false) => {
        if (!hasMore && !fromStart) return;
        setLoadingMore(true);

        const lastDoc = fromStart ? null : lastVisible;

        try {
            const { posts: newPosts, lastVisible: newLastVisible } = await getSocialFeedPosts(POSTS_PER_PAGE, lastDoc);
            setPosts(prev => fromStart ? newPosts : [...prev, ...newPosts]);
            setLastVisible(newLastVisible);
            setHasMore(newPosts.length === POSTS_PER_PAGE);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast({ variant: "destructive", title: "Error", description: "Could not fetch posts." });
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handlePostSubmit = async () => {
        if (!user || !newPost.trim()) return;

        setPosting(true);
        try {
            await createSocialPost(user, newPost);
            setNewPost("");
            toast({
                title: "Post Shared! 🎉",
                description: "Your testimony is now live on the feed.",
            });
            // Reset and fetch from scratch to show the new post at the top
            loadPosts(true);
        } catch (error) {
            console.error("Error creating post:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not share your post. Please try again."
            });
        } finally {
            setPosting(false);
        }
    };

    // Filter posts based on active tab
    const filteredPosts = posts.filter(post => {
        switch (activeTab) {
            case 'breakthroughs':
                return post.category === 'breakthrough';
            case 'questions':
                return post.type === 'question';
            case 'testimonies':
                return post.type === 'testimony';
            default:
                return true;
        }
    });

    const timeAgo = (date: Timestamp | any) => {
        if (!date) return 'Just now';
        
        if (typeof date === 'object' && !date.toDate) {
            return 'Just now';
        }
        
        try {
            const timestamp = typeof date.toDate === 'function' ? date.toDate() : new Date(date);
            const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
            
            if (seconds < 60) return 'Just now';
            
            let interval = seconds / 31536000;
            if (interval > 1) return Math.floor(interval) + "y ago";
            
            interval = seconds / 2592000;
            if (interval > 1) return Math.floor(interval) + "mo ago";
            
            interval = seconds / 86400;
            if (interval > 1) return Math.floor(interval) + "d ago";
            
            interval = seconds / 3600;
            if (interval > 1) return Math.floor(interval) + "h ago";
            
            interval = seconds / 60;
            if (interval > 1) return Math.floor(interval) + "m ago";
            
            return 'Just now';
        } catch (error) {
            console.error('Error processing timestamp:', error);
            return 'Just now';
        }
    };
    
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Enhanced Post Creation Card */}
            <Card>
                <CardHeader className="p-4">
                    <div className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={user?.photoURL || ""} data-ai-hint="person portrait" />
                            <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                        </Avatar>
                        <Textarea 
                            placeholder="Share a testimony, breakthrough, or encouragement... 🙏"
                            className="h-20 resize-none"
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            disabled={!user || posting}
                            data-testid="new-post-textarea"
                        />
                    </div>
                </CardHeader>
                <CardFooter className="p-4 flex justify-between">
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-600">
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-rose-500 hover:text-rose-600">
                            <Video className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button 
                        onClick={handlePostSubmit} 
                        disabled={!user || posting || !newPost.trim()}
                        data-testid="submit-post-button"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {posting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sharing...
                            </>
                        ) : (
                            "Share Testimony"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        
            {/* Enhanced Tabs with Spiritual Categories */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="breakthroughs">🎯 Breakthroughs</TabsTrigger>
                        <TabsTrigger value="questions">❓ Questions</TabsTrigger>
                        <TabsTrigger value="testimonies">✨ Testimonies</TabsTrigger>
                    </TabsList>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
                
                <TabsContent value="all">
                    {loading ? <PostSkeleton /> : (
                        filteredPosts.length > 0 ? (
                            <div className="space-y-6">
                                {filteredPosts.map((post) => (
                                    <PostCard key={post.id} post={post} timeAgo={timeAgo} />
                                ))}
                                {hasMore && (
                                    <div className="text-center">
                                        <Button onClick={() => loadPosts()} disabled={loadingMore} variant="outline">
                                            {loadingMore ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                                    Loading more...
                                                </>
                                            ) : (
                                                "Load More"
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <EmptyFeed tab="all" />
                        )
                    )}
                </TabsContent>
                
                <TabsContent value="breakthroughs">
                    {filteredPosts.length > 0 ? (
                        <div className="space-y-6">
                            {filteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} timeAgo={timeAgo} />
                            ))}
                        </div>
                    ) : (
                        <EmptyFeed tab="breakthroughs" />
                    )}
                </TabsContent>
                
                <TabsContent value="questions">
                    {filteredPosts.length > 0 ? (
                        <div className="space-y-6">
                            {filteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} timeAgo={timeAgo} />
                            ))}
                        </div>
                    ) : (
                        <EmptyFeed tab="questions" />
                    )}
                </TabsContent>
                
                <TabsContent value="testimonies">
                    {filteredPosts.length > 0 ? (
                        <div className="space-y-6">
                            {filteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} timeAgo={timeAgo} />
                            ))}
                        </div>
                    ) : (
                        <EmptyFeed tab="testimonies" />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function PostCard({ post, timeAgo }: { post: Post; timeAgo: (date: any) => string }) {
    const category = getCategoryDisplay(post.category || 'growth');
    const postType = post.type || 'testimony';
    
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={post.user?.avatar} data-ai-hint={post.user?.aiHint} />
                            <AvatarFallback>{post.user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{post.user?.name}</p>
                            <p className="text-xs text-muted-foreground">{timeAgo(post.timestamp)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={cn("text-xs", category.color)}>
                            {category.icon} {category.label}
                        </Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Report content</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="px-4 pb-2 space-y-4">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{post.content}</p>
                {post.imageUrl && (
                    <div className="rounded-lg overflow-hidden border">
                        <Image 
                            src={post.imageUrl} 
                            width={600} 
                            height={400} 
                            alt="Post image" 
                            data-ai-hint={post.aiHint || 'spiritual content image'} 
                            className="w-full h-auto"
                        />
                    </div>
                )}
            </CardContent>
            
            <CardFooter className="p-2 border-t">
                {/* Use our new Spiritual Reactions component */}
                <SpiritualReactions
                    postId={post.id}
                    reactions={post.reactions || { praying: 0, believing: 0, encouraging: 0, inspired: 0 }}
                    userReaction={post.userReaction}
                />
            </CardFooter>
        </Card>
    );
}
