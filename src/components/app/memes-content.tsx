
"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Download,
  Share2,
  ThumbsUp,
  MessageCircle,
  PlusCircle,
  Wand2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const memeCategories = [
    { id: "trending", label: "🔥 Trending" },
    { id: "family", label: "👪 Family" },
    { id: "relationships", label: "❤️ Relationships" },
    { id: "church-life", label: "⛪ Church Life" },
    { id: "growth", label: "🌱 Growth" },
    { id: "encouragement", label: "💪 Encouragement" },
];

const memes = [
  { id: 1, src: "https://placehold.co/600x750.png", alt: "Funny church meme", aiHint: "funny church meme", category: 'church-life', likes: 1200, comments: 45 },
  { id: 2, src: "https://placehold.co/600x750.png", alt: "Family life meme", aiHint: "christian family meme", category: 'family', likes: 2300, comments: 88 },
  { id: 3, src: "https://placehold.co/600x750.png", alt: "Encouraging meme", aiHint: "inspirational quote meme", category: 'encouragement', likes: 5000, comments: 152 },
  { id: 4, src: "https://placehold.co/600x750.png", alt: "Spiritual growth meme", aiHint: "spiritual growth funny", category: 'growth', likes: 850, comments: 23 },
  { id: 5, src: "https://placehold.co/600x750.png", alt: "Trending christian meme", aiHint: "funny christian meme", category: 'trending', likes: 9800, comments: 430 },
  { id: 6, src: "https://placehold.co/600x750.png", alt: "Dating meme", aiHint: "christian dating meme", category: 'relationships', likes: 4100, comments: 210 },
];

export function MemesContent() {
    const [activeTab, setActiveTab] = React.useState("trending");
    
    const filteredMemes = memes.filter(meme => 
        activeTab === 'all' || meme.category === activeTab
    );

    const showToast = (message: string) => {
        toast({
            title: "Coming Soon!",
            description: message,
        });
    }
    
    const { toast } = useToast();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                <h1 className="text-3xl font-bold">Meme Center</h1>
                <p className="text-muted-foreground">Share, discover, and create faith-based memes.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => showToast('The AI Meme Generator is being trained!')}>
                        <Wand2 className="mr-2" /> AI Meme Generator
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2" /> Upload Meme
                            </Button>
                        </DialogTrigger>
                         <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload a Meme</DialogTitle>
                                <DialogDescription>
                                    Share a meme with the community. Please ensure it's respectful and encouraging.
                                </DialogDescription>
                            </DialogHeader>
                             <div className="py-4">
                                <Button className="w-full" onClick={() => showToast('Upload functionality is coming soon.')}>Choose a file</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                   {memeCategories.map(cat => (
                       <TabsTrigger key={cat.id} value={cat.id}>{cat.label}</TabsTrigger>
                   ))}
                </TabsList>
                <TabsContent value={activeTab} className="mt-6">
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {filteredMemes.map(meme => (
                            <MemeCard key={meme.id} meme={meme} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function MemeCard({ meme }: { meme: typeof memes[0] }) {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `${action}!`,
            description: `This functionality is under development.`,
        });
    };

    return (
        <Card className="break-inside-avoid">
            <CardContent className="p-0">
                <Image 
                    src={meme.src} 
                    alt={meme.alt} 
                    width={600} 
                    height={750} 
                    className="rounded-t-lg w-full h-auto"
                    data-ai-hint={meme.aiHint}
                />
            </CardContent>
            <div className="p-2 flex justify-around items-center border-t">
                <Button variant="ghost" size="sm" onClick={() => handleAction("Liked")}>
                    <ThumbsUp className="mr-1.5" /> {meme.likes > 1000 ? `${(meme.likes/1000).toFixed(1)}k` : meme.likes}
                </Button>
                 <Button variant="ghost" size="sm" onClick={() => handleAction("Commented")}>
                    <MessageCircle className="mr-1.5" /> {meme.comments}
                </Button>
                 <Button variant="ghost" size="sm" onClick={() => handleAction("Shared")}>
                    <Share2 className="mr-1.5" /> Share
                </Button>
                 <Button variant="ghost" size="sm" onClick={() => handleAction("Downloaded")}>
                    <Download className="mr-1.5" />
                </Button>
            </div>
        </Card>
    );
}
