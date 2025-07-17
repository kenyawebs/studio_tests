"use client";

import { useState, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
    Heart, 
    MessageCircle, 
    Share2, 
    Image as ImageIcon, 
    Video, 
    Filter, 
    MoreHorizontal, 
    Sparkles, 
    Loader2,
    Hand,
    Lightbulb,
    ThumbsUp,
    Crown,
    Flame,
    Star,
    Trophy,
    Users,
    Globe
} from "lucide-react";
import Image from "next/image";
import { PrayButton } from "@/components/app/pray-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { createSocialPost, getSocialFeedPosts, Post, togglePostReaction } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { DocumentSnapshot } from "firebase/firestore";

const POSTS_PER_PAGE = 5;

// Spiritual engagement types
const SPIRITUAL_REACTIONS = {
    praying: { icon: Hand, label: "Praying", color: "text-purple-600" },
    believing: { icon: Star, label: "Believing", color: "text-yellow-600" },
    encouraging: { icon: ThumbsUp, label: "Encouraging", color: "text-green-600" },
    inspired: { icon: Sparkles, label: "Inspired", color: "text-blue-600" }
} as const;

// Testimony categories for magnetic attraction
const TESTIMONY_CATEGORIES = {
    breakthrough: { icon: Crown, label: "Breakthrough", color: "bg-gradient-to-r from-yellow-400 to-orange-500" },
    healing: { icon: Heart, label: "Healing", color: "bg-gradient-to-r from-pink-400 to-red-500" },
    provision: { icon: Trophy, label: "Provision", color: "bg-gradient-to-r from-green-400 to-blue-500" },
    restoration: { icon: Flame, label: "Restoration", color: "bg-gradient-to-r from-purple-400 to-pink-500" },
    calling: { icon: Lightbulb, label: "Calling", color: "bg-gradient-to-r from-blue-400 to-purple-500" },
    growth: { icon: Star, label: "Growth", color: "bg-gradient-to-r from-indigo-400 to-purple-500" }
} as const;

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
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                </CardFooter>
            </Card>
        ))}
    </div>
);

const EmptyFeed = ({ tab }: { tab: string }) => {
    const getEmptyMessage = () => {
        switch (tab) {
            case "breakthrough":
                return {
                    icon: Crown,
                    title: "No breakthrough stories yet",
                    description: "Be the first to share how God broke through in your life!"
                };
            case "questions":
                return {
                    icon: Lightbulb,
                    title: "No questions yet",
                    description: "Start an honest spiritual conversation!"
                };
            case "restoration":
                return {
                    icon: Flame,
                    title: "No restoration stories yet",
                    description: "Share your journey back to hope!"
                };
            case "unity":
                return {
                    icon: Users,
                    title: "No unity stories yet",
                    description: "Share how God is building bridges!"
                };
            default:
                return {
                    icon: Sparkles,
                    title: "The feed is quiet... for now",
                    description: "Be the first to share a life-changing testimony!"
                };
        }
    };

    const { icon: Icon, title, description } = getEmptyMessage();

    return (
        <div className="text-center py-12 text-muted-foreground">
            <Icon className="mx-auto h-12 w-12" />
            <h3 className="mt-2 text-lg font-medium">{title}</h3>
            <p className="text-sm">{description}</p>
        </div>
    );
};

export function SocialFeedContent() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [newPost, setNewPost] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof TESTIMONY_CATEGORIES>("breakthrough");
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    // Pagination state
    const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        if (!hasMore || loadingMore) return;
        
        setLoadingMore(true);
        try {
            const { posts: newPosts, lastVisible: newLastVisible } = await getSocialFeedPosts(POSTS_PER_PAGE, lastVisible);
            setPosts(prevPosts => lastVisible ? [...prevPosts, ...newPosts] : newPosts);
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
            await createSocialPost(user, newPost, selectedCategory);
            setNewPost("");
            toast({
                title: "Testimony Shared! 🔥",
                description: "Your spiritual milestone is now inspiring others.",
            });
            // Reset and fetch from scratch to show the new post at the top
            setPosts([]);
            setLastVisible(null);
            setHasMore(true);
            loadPosts();

        } catch (error) {
            console.error("Error creating post:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not share your testimony. Please try again."
            });
        } finally {
            setPosting(false);
        }
    };
    
    const timeAgo = (date: Timestamp | null) => {
        if (!date) return 'Just now';
        const seconds = Math.floor((new Date().getTime() - date.toDate().getTime()) / 1000);
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
        return Math.floor(seconds) + "s ago";
    };

    const getPlaceholderText = () => {
        switch (selectedCategory) {
            case "breakthrough":
                return "Share your breakthrough story... How did God come through for you?";
            case "healing":
                return "Share your healing testimony... What has God restored in your life?";
            case "provision":
                return "Share how God provided... What miracle did you experience?";
            case "restoration":
                return "Share your restoration journey... How did God bring you back?";
            case "calling":
                return "Share your calling discovery... What is God calling you to?";
            case "growth":
                return "Share your growth milestone... How are you becoming more like Jesus?";
            default:
                return "Share your spiritual milestone or testimony...";
        }
    };

    const filterPostsByTab = (posts: Post[]) => {
        switch (activeTab) {
            case "breakthrough":
                return posts.filter(post => post.category === "breakthrough");
            case "questions":
                return posts.filter(post => post.category === "growth" || post.type === "question"); // Simplified for now
            case "restoration":
                return posts.filter(post => post.category === "restoration");
            case "unity":
                return posts.filter(post => post.category === "growth"); // Placeholder, needs a real category
            default:
                return posts;
        }
    };

    const filteredPosts = filterPostsByTab(posts);

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Post Creation Card */}
            <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardHeader className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-primary">Share Your Spiritual Milestone</h3>
                    </div>
                    
                    {/* Category Selection */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {Object.entries(TESTIMONY_CATEGORIES).map(([key, category]) => {
                            const Icon = category.icon;
                            return (
                                <Badge
                                    key={key}
                                    variant={selectedCategory === key ? "default" : "outline"}
                                    className={cn(
                                        "cursor-pointer transition-all hover:scale-105",
                                        selectedCategory === key && category.color
                                    )}
                                    onClick={() => setSelectedCategory(key as keyof typeof TESTIMONY_CATEGORIES)}
                                >
                                    <Icon className="h-3 w-3 mr-1" />
                                    {category.label}
                                </Badge>
                            );
                        })}
                    </div>

                    <div className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={user?.photoURL || ""} data-ai-hint="person portrait" />
                            <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                        </Avatar>
                        <Textarea 
                            placeholder={getPlaceholderText()}
                            className="h-20 border-primary/20 focus:border-primary/50"
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
                            <ImageIcon />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-rose-500 hover:text-rose-600">
                            <Video />
                        </Button>
                    </div>
                    <Button 
                        onClick={handlePostSubmit} 
                        disabled={!user || posting || !newPost.trim()}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        data-testid="submit-post-button"
                    >
                        {posting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sharing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Share Testimony
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {/* Global Impact Banner */}
            <Card className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Globe className="w-10 h-10"/>
                    <div>
                        <h3 className="font-bold text-lg">Global Spiritual Impact</h3>
                        <p className="text-sm opacity-90">Your testimony could transform lives across Nigeria, Kenya, Philippines, and Brazil! 🌍</p>
                    </div>
                </CardHeader>
            </Card>
        
            {/* Magnetic Attraction Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <TabsList className="bg-secondary/50">
                        <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <Sparkles className="mr-2 h-4 w-4"/>All Stories
                        </TabsTrigger>
                        <TabsTrigger value="breakthrough" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                            <Crown className="mr-2 h-4 w-4"/>Breakthrough
                        </TabsTrigger>
                        <TabsTrigger value="questions" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                            <Lightbulb className="mr-2 h-4 w-4"/>Questions
                        </TabsTrigger>
                        <TabsTrigger value="restoration" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                            <Flame className="mr-2 h-4 w-4"/>Restoration
                        </TabsTrigger>
                        <TabsTrigger value="unity" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                            <Users className="mr-2 h-4 w-4"/>Unity
                        </TabsTrigger>
                    </TabsList>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
                
                <TabsContent value="all">
                    {loading ? <PostSkeleton /> : (
                        posts.length > 0 ? (
                            <div className="space-y-6">
                                {posts.map((post) => <PostCard key={post.id} post={post} timeAgo={timeAgo} />)}
                                {hasMore && (
                                    <div className="text-center">
                                        <Button onClick={loadPosts} disabled={loadingMore} variant="outline">
                                            {loadingMore ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                                    Loading more testimonies...
                                                </>
                                            ) : (
                                                "Load More Testimonies"
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
                
                {/* Other tab contents */}
                {["breakthrough", "questions", "restoration", "unity"].map(tab => (
                    <TabsContent key={tab} value={tab}>
                        {loading ? <PostSkeleton /> : (
                            filteredPosts.length > 0 ? (
                                <div className="space-y-6">
                                    {filteredPosts.map((post) => <PostCard key={post.id} post={post} timeAgo={timeAgo} />)}
                                </div>
                            ) : (
                                <EmptyFeed tab={tab} />
                            )
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

function PostCard({ post, timeAgo }: { post: Post, timeAgo: (date: Timestamp | null) => string }) {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const [reactions, setReactions] = useState(post.reactions || { praying: 0, believing: 0, encouraging: 0, inspired: 0 });
    const [userReaction, setUserReaction] = useState(post.userReactions?.[user?.uid || ''] || null);

    const handleReaction = (reactionType: keyof typeof SPIRITUAL_REACTIONS) => {
        if (!user || isPending) return;

        startTransition(async () => {
            const newReactions = { ...reactions };
            const previousReaction = userReaction;
            
            if (previousReaction) {
                newReactions[previousReaction] = Math.max(0, newReactions[previousReaction] - 1);
            }
            
            if (previousReaction !== reactionType) {
                newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
                setUserReaction(reactionType);
            } else {
                setUserReaction(null);
            }
            
            setReactions(newReactions);
            
            try {
                await togglePostReaction(post.id, user.uid, reactionType);
                toast({
                    title: `${SPIRITUAL_REACTIONS[reactionType].label} added! 🙏`,
                    description: "Your spiritual support has been shared.",
                });
            } catch (error) {
                // Revert on error
                setReactions(post.reactions || { praying: 0, believing: 0, encouraging: 0, inspired: 0 });
                setUserReaction(previousReaction);
                toast({ variant: "destructive", title: "Error", description: "Could not update reaction." });
            }
        });
    };

    const getCategoryBadge = () => {
        const category = post.category as keyof typeof TESTIMONY_CATEGORIES;
        if (!category || !TESTIMONY_CATEGORIES[category]) return null;
        
        const { icon: Icon, label, color } = TESTIMONY_CATEGORIES[category];
        return (
            <Badge className={cn("text-white", color)}>
                <Icon className="h-3 w-3 mr-1" />
                {label}
            </Badge>
        );
    };

    return (
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary/30">
            <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={post.user?.avatar} data-ai-hint={post.user?.aiHint} />
                            <AvatarFallback>{post.user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">{post.user?.name}</p>
                                {getCategoryBadge()}
                            </div>
                            <p className="text-xs text-muted-foreground">{timeAgo(post.timestamp)}</p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Connect with {post.user?.name}</DropdownMenuItem>
                            <DropdownMenuItem>Hide this testimony</DropdownMenuItem>
                            <DropdownMenuItem>Report content</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="px-4 pb-2 space-y-4">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{post.content}</p>
                {post.type === 'image' && post.imageUrl && (
                    <div className="rounded-lg overflow-hidden border">
                        <Image 
                            src={post.imageUrl} 
                            width={600} 
                            height={400} 
                            alt="Testimony image" 
                            data-ai-hint={post.aiHint || 'spiritual testimony image'} 
                        />
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-2 border-t bg-secondary/20">
                <div className="flex justify-around text-muted-foreground w-full">
                    {Object.entries(SPIRITUAL_REACTIONS).map(([key, reaction]) => {
                        const Icon = reaction.icon;
                        const count = reactions[key as keyof typeof reactions] || 0;
                        const isActive = userReaction === key;
                        
                        return (
                            <Button
                                key={key}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "flex items-center gap-1 transition-colors",
                                    isActive && reaction.color
                                )}
                                onClick={() => handleReaction(key as keyof typeof SPIRITUAL_REACTIONS)}
                                disabled={!user || isPending}
                            >
                                <Icon className={cn("w-4 h-4", isActive && "fill-current")} />
                                <span className="text-xs">{count}</span>
                                <span className="text-xs hidden sm:inline">{reaction.label}</span>
                            </Button>
                        );
                    })}
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{Array.isArray(post.comments) ? post.comments.length : 0}</span>
                        <span className="text-xs hidden sm:inline">Share</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
