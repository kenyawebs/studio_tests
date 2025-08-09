
"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
    Filter, 
    Image as ImageIcon, 
    Loader2,
    MoreHorizontal, 
    Sparkles, 
    Star,
    Target,
    Video, 
    HelpCircle,
    X,
    AlertTriangle
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { createSocialPost, getSocialFeedPosts, Post, TestimonyCategory } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { DocumentSnapshot } from "firebase/firestore";
import { SpiritualReactions } from "./spiritual-reactions";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const POSTS_PER_PAGE = 5;

const testimonyCategories: { value: TestimonyCategory | 'all', label: string }[] = [
    { value: 'breakthrough', label: 'Breakthrough' },
    { value: 'healing', label: 'Healing' },
    { value: 'provision', label: 'Provision' },
    { value: 'restoration', label: 'Restoration' },
    { value: 'calling', label: 'Calling' },
    { value: 'growth', label: 'Growth' }
];

const getCategoryDisplay = (category: string) => {
    const categoryMap = {
        breakthrough: { 
            color: 'bg-green-100 text-green-800 border-green-200', 
            icon: '🎯', 
            label: 'Breakthrough' 
        },
        healing: { 
            color: 'bg-blue-100 text-blue-800 border-blue-200', 
            icon: '🌿', 
            label: 'Healing' 
        },
        provision: { 
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
            icon: '🙏', 
            label: 'Provision' 
        },
        restoration: { 
            color: 'bg-purple-100 text-purple-800 border-purple-200', 
            icon: '🔄', 
            label: 'Restoration' 
        },
        calling: { 
            color: 'bg-orange-100 text-orange-800 border-orange-200', 
            icon: '📞', 
            label: 'Calling' 
        },
        growth: { 
            color: 'bg-gray-100 text-gray-800 border-gray-200', 
            icon: '🌱', 
            label: 'Growth' 
        }
    };
    
    return categoryMap[category as keyof typeof categoryMap] || categoryMap.growth;
};

const PostSkeleton = () => (
    <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
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
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                {messages[tab as keyof typeof messages] || "No posts match your filters"}
            </h3>
            <p className="text-sm text-gray-600">
                Be the first to share something meaningful, or adjust your filters! 🙏
            </p>
        </div>
    );
};

export function SocialFeedContent() {
    const { user, authReady } = useAuth();
    const { toast } = useToast();
    const [newPost, setNewPost] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategories, setSelectedCategories] = useState<TestimonyCategory[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const loadPosts = React.useCallback(async (fromStart = false) => {
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
            toast({ 
                variant: "destructive", 
                title: "Error", 
                description: "Could not fetch posts." 
            });
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [hasMore, lastVisible, toast]);

    useEffect(() => {
        loadPosts(true);
    }, [loadPosts]);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    const handlePostSubmit = async () => {
        if (!user || (!newPost.trim() && !imageFile)) {
            toast({ variant: "destructive", title: "Cannot post", description: "Please write a message or add an image." });
            return;
        }

        setPosting(true);
        try {
            let imageUrl = "";
            let aiHint = "user uploaded image";
            if (imageFile) {
                const storageRef = ref(storage, `social-posts/${user.uid}/${Date.now()}-${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            await createSocialPost(user, newPost, imageUrl, aiHint);
            
            setNewPost("");
            clearImage();

            toast({
                title: "Testimony Shared! 🎉",
                description: "Your spiritual milestone is now live on the feed."
            });
            loadPosts(true);
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

    const handleCategoryToggle = (category: TestimonyCategory) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const filteredPosts = posts.filter(post => {
        const tabMatch = (() => {
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
        })();

        const categoryMatch = selectedCategories.length === 0 || (post.category && selectedCategories.includes(post.category));

        return tabMatch && categoryMatch;
    });

    const timeAgo = (date: Timestamp | any) => {
        if (!date || typeof date.toDate !== 'function') return 'Just now';
        
        try {
            const seconds = Math.floor((new Date().getTime() - date.toDate().getTime()) / 1000);
            if (seconds < 60) return 'Just now';
            const intervals = { year: 31536000, month: 2592000, day: 86400, hour: 3600, minute: 60 };
            let counter;
            if (seconds >= intervals.year) {
                counter = Math.floor(seconds / intervals.year);
                return `${counter}y ago`;
            }
            if (seconds >= intervals.month) {
                counter = Math.floor(seconds / intervals.month);
                return `${counter}mo ago`;
            }
            if (seconds >= intervals.day) {
                counter = Math.floor(seconds / intervals.day);
                return `${counter}d ago`;
            }
            if (seconds >= intervals.hour) {
                counter = Math.floor(seconds / intervals.hour);
                return `${counter}h ago`;
            }
            counter = Math.floor(seconds / intervals.minute);
            return `${counter}m ago`;
        } catch (error) {
            console.error('Error processing timestamp:', error);
            return 'Just now';
        }
    };
    
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg">
                <CardHeader className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                    <div className="flex gap-4">
                        <Avatar className="border-2 border-purple-200">
                            <AvatarImage src={user?.photoURL || ""} data-ai-hint="person portrait" />
                            <AvatarFallback className="bg-purple-100 text-purple-700">
                                {user?.displayName?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                             <Textarea 
                                placeholder="Share a testimony, breakthrough, or encouragement... 🙏✨"
                                className="h-20 resize-none border-purple-200 focus:border-purple-400"
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                disabled={!user || posting}
                                data-testid="new-post-textarea"
                            />
                            {imagePreview && (
                                <div className="relative">
                                    <Image src={imagePreview} alt="Image preview" width={100} height={100} className="rounded-md object-cover" />
                                    <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={clearImage}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="p-4 flex justify-between bg-white">
                    <div className="flex gap-2">
                        <input
                            type="file"
                            ref={imageInputRef}
                            onChange={handleImageSelect}
                            className="hidden"
                            accept="image/*"
                            disabled={posting}
                        />
                        <Button variant="ghost" size="icon" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50" onClick={() => imageInputRef.current?.click()} disabled={posting}>
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"><Video className="h-4 w-4" /></Button>
                    </div>
                    <Button onClick={handlePostSubmit} disabled={!user || posting || (!newPost.trim() && !imageFile)} data-testid="submit-post-button" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6">
                        {posting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sharing...</> : <><Sparkles className="mr-2 h-4 w-4" /> Share Testimony</>}
                    </Button>
                </CardFooter>
            </Card>
        
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <TabsList className="grid w-full grid-cols-4 bg-purple-50 border border-purple-200">
                        <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">All</TabsTrigger>
                        <TabsTrigger value="breakthroughs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"><Target className="mr-1 h-3 w-3" />Breakthroughs</TabsTrigger>
                        <TabsTrigger value="questions" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"><HelpCircle className="mr-1 h-3 w-3" />Questions</TabsTrigger>
                        <TabsTrigger value="testimonies" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"><Star className="mr-1 h-3 w-3" />Testimonies</TabsTrigger>
                    </TabsList>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {testimonyCategories.map(cat => (
                                <DropdownMenuCheckboxItem
                                    key={cat.value}
                                    checked={selectedCategories.includes(cat.value as TestimonyCategory)}
                                    onCheckedChange={() => handleCategoryToggle(cat.value as TestimonyCategory)}
                                >
                                    {cat.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                <TabsContent value={activeTab}>
                    {loading ? <PostSkeleton /> : (
                        filteredPosts.length > 0 ? (
                            <div className="space-y-6">
                                {filteredPosts.map((post) => (
                                    <PostCard key={post.id} post={post} timeAgo={timeAgo} />
                                ))}
                                {hasMore && (
                                    <div className="text-center">
                                        <Button onClick={() => loadPosts()} disabled={loadingMore} variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                                            {loadingMore ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Loading more...</> : "Load More Testimonies"}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <EmptyFeed tab={activeTab} />
                        )
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function ReportDialog({ open, onOpenChange, post }: { open: boolean, onOpenChange: (open: boolean) => void, post: Post }) {
    const { toast } = useToast();
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleSubmit = async () => {
      if (!reason) {
        toast({ variant: "destructive", title: "Please select a reason for the report."});
        return;
      }
      setIsSubmitting(true);
      console.log({
        postId: post.id,
        reason,
        description,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({ title: "Report Submitted", description: "Thank you for helping keep the community safe. A moderator will review your report." });
      setIsSubmitting(false);
      onOpenChange(false);
      setReason("");
      setDescription("");
    };
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Content</DialogTitle>
            <DialogDescription>
              Help us understand the problem. What&apos;s wrong with this post by {post.user?.name}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for reporting</Label>
              <Select onValueChange={setReason} value={reason}>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inappropriate_content">Inappropriate Content</SelectItem>
                  <SelectItem value="harassment">Harassment or Hate Speech</SelectItem>
                  <SelectItem value="spam">Spam or Scam</SelectItem>
                  <SelectItem value="false_information">False Information</SelectItem>
                  <SelectItem value="cultural_insensitivity">Cultural Insensitivity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Additional Details (Optional)</Label>
                <Textarea 
                    id="description"
                    placeholder="Provide more information..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
          </div>
          <DialogClose asChild>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={isSubmitting || !reason}>
                    {isSubmitting ? <Loader2 className="mr-2 animate-spin"/> : null} Submit Report
                </Button>
              </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

function PostCard({ post, timeAgo }: { post: Post; timeAgo: (date: any) => string }) {
    const category = getCategoryDisplay(post.category || 'growth');
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    
    return (
        <>
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <Avatar className="border-2 border-purple-100">
                                <AvatarImage src={post.user?.avatar} data-ai-hint={post.user?.aiHint} />
                                <AvatarFallback className="bg-purple-100 text-purple-700">{post.user?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-gray-900">{post.user?.name}</p>
                                <p className="text-xs text-gray-500">{timeAgo(post.timestamp)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={cn("text-xs border", category.color)}>{category.icon} {category.label}</Badge>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-purple-50"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setIsReportDialogOpen(true)}>
                                        <AlertTriangle className="mr-2 h-4 w-4" />
                                        Report content
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                
                <CardContent className="px-4 pb-2 space-y-4">
                    <p className="text-sm whitespace-pre-wrap leading-relaxed text-gray-800">{post.content}</p>
                    {post.imageUrl && (
                        <div className="rounded-lg overflow-hidden border border-purple-100">
                            <Image src={post.imageUrl} width={600} height={400} alt="Post image" data-ai-hint={post.aiHint || 'spiritual content image'} className="w-full h-auto" />
                        </div>
                    )}
                </CardContent>
                
                <CardFooter className="p-3 border-t border-purple-100 bg-purple-50/30">
                    <SpiritualReactions postId={post.id} reactions={post.reactions || { praying: 0, believing: 0, encouraging: 0, inspired: 0 }} userReaction={post.userReaction?.[(post as any).userId]} />
                </CardFooter>
            </Card>
            <ReportDialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen} post={post} />
        </>
    );
}
