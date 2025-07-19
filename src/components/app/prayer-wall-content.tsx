
"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, ThumbsUp, MessageCircle, Smile, CheckCheck, Sparkles, Trophy, BookOpen, Wand2, AlertTriangle, Loader2 } from "lucide-react";
import { PrayButton } from "@/components/app/pray-button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { askPrayerAssistant, PrayerAssistantInput } from "@/ai/flows/prayer-assistant-flow";
import { createPrayerRequest, getPrayerRequests, PrayerRequest } from "@/lib/firestore";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { DocumentSnapshot } from "firebase/firestore";

const REQUESTS_PER_PAGE = 5;

const PrayerWallSkeleton = () => (
    <div className="space-y-4 mt-4">
        {[...Array(3)].map((_, i) => (
            <Card key={`skeleton-${i}`}>
                <CardContent className="p-4 flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-grow space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>
                <CardFooter className="p-4 border-t">
                     <Skeleton className="h-8 w-24" />
                </CardFooter>
            </Card>
        ))}
    </div>
);

const EmptyFeed = ({ message }: { message: string }) => (
    <div className="text-center py-12 text-muted-foreground">
        <Sparkles className="mx-auto h-12 w-12" />
        <h3 className="mt-2 text-lg font-medium">{message}</h3>
        <p className="text-sm">Be the first to share something!</p>
    </div>
);


export function PrayerWallContent() {
    const { user } = useAuth();
    const { toast } = useToast();
    const isAiConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;

    const [newRequest, setNewRequest] = useState("");
    const [posting, setPosting] = useState(false);

    // AI Assistant State
    const [prayerTopic, setPrayerTopic] = useState("");
    const [prayerResponse, setPrayerResponse] = useState("");
    const [loadingPrayer, setLoadingPrayer] = useState(false);

    // New state for handling multiple feeds
    const [feeds, setFeeds] = useState<{ [key: string]: { items: PrayerRequest[], lastVisible: DocumentSnapshot | null, hasMore: boolean } }>({
        all: { items: [], lastVisible: null, hasMore: true },
        requests: { items: [], lastVisible: null, hasMore: true },
        answered: { items: [], lastVisible: null, hasMore: true },
        testimonies: { items: [], lastVisible: null, hasMore: true },
        verdicts: { items: [], lastVisible: null, hasMore: true },
    });
    const [loadingFeeds, setLoadingFeeds] = useState<{ [key: string]: boolean }>({});
    const [activeTab, setActiveTab] = useState<string>("all");
    const [initialLoading, setInitialLoading] = useState(true);

    const loadRequests = async (tab: string) => {
        if (loadingFeeds[tab] || !feeds[tab].hasMore) return;

        setLoadingFeeds(prev => ({ ...prev, [tab]: true }));
        
        const typeFilter = tab === 'all' ? undefined : tab as PrayerRequest['type'];

        try {
            const { requests: newRequests, lastVisible: newLastVisible } = await getPrayerRequests(REQUESTS_PER_PAGE, feeds[tab].lastVisible, typeFilter);
            
            setFeeds(prevFeeds => {
                const existingIds = new Set(prevFeeds[tab].items.map(item => item.id));
                const uniqueNewItems = newRequests.filter(item => !existingIds.has(item.id));
                return {
                    ...prevFeeds,
                    [tab]: {
                        items: [...prevFeeds[tab].items, ...uniqueNewItems],
                        lastVisible: newLastVisible,
                        hasMore: newRequests.length === REQUESTS_PER_PAGE
                    }
                }
            });
            
        } catch (error) {
            console.error("Error fetching prayer requests for tab", tab, error);
            toast({ variant: "destructive", title: "Error", description: "Could not fetch prayer requests." });
        } finally {
            setLoadingFeeds(prev => ({ ...prev, [tab]: false }));
            if (initialLoading) setInitialLoading(false);
        }
    };

    useEffect(() => {
        // Load initial data for the 'all' tab
        loadRequests('all');
    }, []);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        if (feeds[value].items.length === 0 && feeds[value].hasMore) {
            loadRequests(value);
        }
    };
    
    const resetFeeds = () => {
        const resetState = { items: [], lastVisible: null, hasMore: true };
        setFeeds({
            all: { ...resetState },
            requests: { ...resetState },
            answered: { ...resetState },
            testimonies: { ...resetState },
            verdicts: { ...resetState },
        });
        // After resetting, reload the current tab's data
        setTimeout(() => loadRequests(activeTab), 0);
    };


    const handlePostRequest = async () => {
        if (!user || !newRequest.trim()) return;
        setPosting(true);
        try {
            await createPrayerRequest(user, newRequest);
            setNewRequest("");
            toast({
                title: "Success!",
                description: "Your post has been shared with the community.",
            });
            // Reset and reload feeds
            resetFeeds();
        } catch (error) {
            console.error("Error posting request: ", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not post your request. Please try again."
            });
        } finally {
            setPosting(false);
        }
    };
    
    const handleGetPrayer = async () => {
        if (!prayerTopic.trim() || !isAiConfigured) return;
        setLoadingPrayer(true);
        setPrayerResponse("");
        try {
            const input: PrayerAssistantInput = { topic: prayerTopic };
            const result = await askPrayerAssistant(input);
            setPrayerResponse(result.prayer);
        } catch (error) {
             console.error("AI Prayer Error: ", error);
            toast({
                variant: "destructive",
                title: "AI Error",
                description: "Could not generate a response. Please try again."
            });
        } finally {
            setLoadingPrayer(false);
        }
    };
    
    const renderFeed = (tab: string) => {
        const feed = feeds[tab];
        if (loadingFeeds[tab] && feed.items.length === 0) {
            return <PrayerWallSkeleton />;
        }
        if (feed.items.length === 0 && !feed.hasMore) {
            return <EmptyFeed message={`No ${tab} to show.`} />;
        }
        return (
            <div className="space-y-4">
                {feed.items.map(p => <PrayerCard key={p.id} {...p} />)}
                {feed.hasMore && (
                    <div className="text-center">
                        <Button onClick={() => loadRequests(tab)} disabled={loadingFeeds[tab]}>
                            {loadingFeeds[tab] ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Loading...</> : "Load More"}
                        </Button>
                    </div>
                )}
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Share a Request or Encouragement</CardTitle>
                        <CardDescription>Let the community stand with you or celebrate with you. Your post will be public.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea 
                            placeholder="What's on your heart?" 
                            className="min-h-[100px]"
                            value={newRequest}
                            onChange={(e) => setNewRequest(e.target.value)}
                            disabled={!user || posting}
                            data-testid="new-prayer-request-textarea"
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">You can post anonymously in settings.</p>
                        <Button onClick={handlePostRequest} disabled={posting || !newRequest.trim() || !user} data-testid="submit-prayer-request-button">
                            {posting ? "Posting..." : <><Send className="mr-2 h-4 w-4" /> Post to Wall</>}
                        </Button>
                    </CardFooter>
                </Card>

                <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="requests">Requests</TabsTrigger>
                        <TabsTrigger value="answered"><CheckCheck className="mr-2"/>Answered</TabsTrigger>
                        <TabsTrigger value="testimonies"><Sparkles className="mr-2"/>Encouragements</TabsTrigger>
                        <TabsTrigger value="verdicts"><Trophy className="mr-2"/>Victories</TabsTrigger>
                    </TabsList>
                     {initialLoading ? <PrayerWallSkeleton /> : (
                        <>
                            <TabsContent value="all" className="mt-4">{renderFeed('all')}</TabsContent>
                            <TabsContent value="requests" className="mt-4">{renderFeed('requests')}</TabsContent>
                            <TabsContent value="answered" className="mt-4">{renderFeed('answered')}</TabsContent>
                            <TabsContent value="testimonies" className="mt-4">{renderFeed('testimonies')}</TabsContent>
                            <TabsContent value="verdicts" className="mt-4">{renderFeed('verdicts')}</TabsContent>
                        </>
                     )}
                </Tabs>
            </div>
            <div className="lg:col-span-1 space-y-6 lg:sticky top-8">
                <Card className="bg-gradient-to-br from-primary to-fuchsia-600 text-primary-foreground">
                    <CardHeader>
                        <CardTitle>Wisdom for Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg italic">&quot;For where two or three gather in my name, there am I with them.&quot;</p>
                        <p className="text-right font-semibold mt-2">- Matthew 18:20</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="secondary" className="w-full">
                            <Link href="/wisdom-texts">
                                <BookOpen className="mr-2 h-4 w-4" /> Explore Wisdom Texts
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Wand2 className="text-primary"/> Life Guidance AI
                        </CardTitle>
                        <CardDescription>Need help finding the words? Let our AI provide some guidance.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {!isAiConfigured && (
                            <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                               <AlertTriangle className="h-5 w-5"/> 
                               <p>AI features are disabled. Please configure your Google AI API key.</p>
                            </div>
                        )}
                        <Textarea 
                            placeholder="What's on your mind? Share any concern, challenge, or question you're facing..."
                            value={prayerTopic}
                            onChange={(e) => setPrayerTopic(e.target.value)}
                            disabled={!isAiConfigured || loadingPrayer}
                        />
                        {loadingPrayer && <Skeleton className="h-24 w-full" />}
                        {prayerResponse && (
                            <div className="p-4 bg-muted rounded-md text-sm">
                                <p className="whitespace-pre-wrap">{prayerResponse}</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="w-full">
                                        <Button className="w-full" onClick={handleGetPrayer} disabled={loadingPrayer || !prayerTopic.trim() || !isAiConfigured}>
                                            {loadingPrayer ? "Generating..." : "Get Guidance"}
                                        </Button>
                                    </div>
                                </TooltipTrigger>
                                 {!isAiConfigured && (
                                    <TooltipContent>
                                        <p>AI is not configured. See AI_SETUP.md</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

function PrayerCard({ id, name, avatar, aiHint, request, prayCount, timestamp, comments, type }: PrayerRequest) {
    const typeMeta = {
        'answered': { color: 'border-green-500', icon: <CheckCheck className="h-4 w-4 text-green-500"/>, label: 'Answered' },
        'testimony': { color: 'border-yellow-500', icon: <Sparkles className="h-4 w-4 text-yellow-500"/>, label: 'Encouragement' },
        'verdict': { color: 'border-blue-500', icon: <Trophy className="h-4 w-4 text-blue-500"/>, label: 'Victory' },
        'request': { color: 'border-transparent', icon: null, label: '' },
    }[type];

    const timeAgo = (date: any) => {
        if (!date) return 'Just now';
        const seconds = Math.floor((new Date().getTime() - date.toDate().getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <Card className={`border-l-4 ${typeMeta.color}`}>
            <CardContent className="p-4 flex gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={avatar} data-ai-hint={aiHint} />
                    <AvatarFallback>{name?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">{name}</p>
                            <p className="text-xs text-muted-foreground">{timeAgo(timestamp)}</p>
                        </div>
                        {typeMeta.icon && <Badge variant="outline" className="flex items-center gap-1.5">{typeMeta.icon}{typeMeta.label}</Badge>}
                    </div>
                    <p className="mt-2 text-sm text-foreground/80">{request}</p>
                </div>
            </CardContent>
            <CardFooter className="p-0">
                <Collapsible className="w-full">
                     <Separator />
                    <div className="p-4 flex items-center gap-2">
                        <PrayButton prayerId={id} count={prayCount} />
                        <div className="flex items-center gap-1 ml-auto">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1.5"><ThumbsUp className="w-4 h-4" /> Agree</Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1.5"><Smile className="w-4 h-4" /> Encourage</Button>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /> {comments?.length > 0 ? comments.length : ''} Comment</Button>
                            </CollapsibleTrigger>
                        </div>
                    </div>
                    <CollapsibleContent>
                        <Separator />
                        <div className="bg-secondary/50 p-4 space-y-4">
                            {comments?.map((comment, index) => (
                                <div key={index} className="flex gap-2 text-sm">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-background rounded-lg p-2 flex-1">
                                        <p className="font-semibold text-xs">{comment.name}</p>
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                             <div className="flex gap-2 pt-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <Input placeholder="Write a comment..." className="h-8"/>
                                <Button size="sm">Send</Button>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardFooter>
        </Card>
    );
}
