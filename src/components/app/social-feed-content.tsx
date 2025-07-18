
"use client";

import { useState, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
    Heart, 
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
import { createSocialPost, getSocialFeedPosts, Post, toggleLikePost } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { DocumentSnapshot } from "firebase/firestore";

const POSTS_PER_PAGE = 5;

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
    return (
        <div className="text-center py-12 text-muted-foreground">
            <Sparkles className="mx-auto h-12 w-12" />
            <h3 className="mt-2 text-lg font-medium">The feed is quiet... for now</h3>
            <p className="text-sm">Be the first to share something!</p>
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
                title: "Post Shared!",
                description: "Your post is now live on the feed.",
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
    
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card>
                <CardHeader className="p-4">
                     <div className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={user?.photoURL || ""} data-ai-hint="person portrait" />
                            <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                        </Avatar>
                        <Textarea 
                            placeholder="Share a testimony, milestone, or encouragement..."
                            className="h-20"
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
                        data-testid="submit-post-button"
                    >
                        {posting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Posting...
                            </>
                        ) : (
                            "Post"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="all">For You</TabsTrigger>
                        <TabsTrigger value="following">Following</TabsTrigger>
                    </TabsList>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
                
                <TabsContent value="all">
                    {loading ? <PostSkeleton /> : (
                        posts.length > 0 ? (
                            <div className="space-y-6">
                                {posts.map((post) => <PostCard key={post.id} post={post} />)}
                                {hasMore && (
                                    <div className="text-center">
                                        <Button onClick={() => loadPosts()} disabled={loadingMore} variant="outline">
                                            {loadingMore ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                                    Loading...
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
                <TabsContent value="following">
                     <EmptyFeed tab="following" />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function PostCard({ post }: { post: Post }) {
    const { user } = useAuth();
    const [isPending, startTransition] = useTransition();
    
    const timeAgo = (date: Timestamp | any) => {
        if (!date || typeof date.toDate !== 'function') {
            return 'Just now';
        }
    
        try {
            const timestamp = date.toDate();
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

    const handleLike = () => {
        if (!user) return;
        startTransition(async () => {
             await toggleLikePost(post.id, user.uid);
        });
    };
    
    const hasLiked = user ? post.likedBy?.includes(user.uid) : false;

    return (
        <Card>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Report content</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                            data-ai-hint={post.aiHint || 'social media image'} 
                        />
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-2 border-t">
                <div className="flex justify-around text-muted-foreground w-full">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5" onClick={handleLike} disabled={isPending}>
                        <Heart className={cn("w-4 h-4", hasLiked && "text-red-500 fill-current")} /> {post.likes || 0}
                    </Button>
                     <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4" /> {post.comments || 0}
                    </Button>
                     <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

    