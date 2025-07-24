
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
  Heart,
  Smile,
  Users,
  Briefcase,
  Church,
  Laugh
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const memeCategories = [
    { id: "trending", label: "🔥 Trending", icon: Laugh },
    { id: "family", label: "👪 Family", icon: Users },
    { id: "relationships", label: "❤️ Relationships", icon: Heart },
    { id: "church-life", label: "⛪ Church Life", icon: Church },
    { id: "work", label: "💼 Work Life", icon: Briefcase },
    { id: "encouragement", label: "💪 Encouragement", icon: Smile },
];

const memes = [
  { id: 1, category: 'church-life', icon: '☕', text: "That feeling when the sermon ends but the coffee and fellowship is about to begin.", bgColor: "from-amber-500 to-yellow-500", likes: 1200, comments: 45 },
  { id: 2, category: 'family', icon: '🤣', text: "My kids' prayer: 'And please give Mom more patience. Not for her, for me.'", bgColor: "from-blue-500 to-cyan-500", likes: 2300, comments: 88 },
  { id: 3, category: 'encouragement', icon: '✨', text: "Don't just count your blessings. BE the blessing in someone's life today.", bgColor: "from-green-500 to-emerald-500", likes: 5000, comments: 152 },
  { id: 4, category: 'work', icon: '🙏', text: "Me trying to find the 'sufficient grace' in my Monday morning inbox.", bgColor: "from-indigo-500 to-violet-500", likes: 850, comments: 23 },
  { id: 5, category: 'trending', icon: '🔥', text: "They say 'Read the room.' I read my Bible instead. The plot twists are better.", bgColor: "from-rose-500 to-pink-500", likes: 9800, comments: 430 },
  { id: 6, category: 'relationships', icon: '🎯', text: "Looking for a relationship that's less 'Netflix and chill' and more 'Proverbs and build.'", bgColor: "from-purple-500 to-fuchsia-500", likes: 4100, comments: 210 },
  { id: 7, category: 'church-life', icon: '🎶', text: "When the worship leader says 'one more time' for the fifth time.", bgColor: "from-teal-500 to-cyan-600", likes: 3200, comments: 112 },
  { id: 8, category: 'encouragement', icon: '🙌', text: "Your current situation is not your final destination. Keep the faith.", bgColor: "from-sky-500 to-blue-600", likes: 7400, comments: 301 },
];

export function MemesContent() {
    const [activeTab, setActiveTab] = React.useState("trending");
    
    const filteredMemes = activeTab === 'all' 
        ? memes 
        : memes.filter(meme => meme.category === activeTab);

    const showToast = (message: string) => {
        toast({
            title: "Coming Soon!",
            description: message,
        });
    }
    
    const { toast } = useToast();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center space-y-4">
            <div className="flex w-full max-w-sm justify-between items-center px-4 pt-4">
                <h1 className="text-2xl font-bold">Meme Center</h1>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Wand2 className="mr-2" /> AI Generator
                        </Button>
                    </DialogTrigger>
                     <DialogContent>
                        <DialogHeader>
                            <DialogTitle>AI Meme Generator</DialogTitle>
                            <DialogDescription>
                                This feature is coming soon! Get ready to create hilarious and inspiring text-based memes with the help of AI.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-sm">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto flex-wrap">
                   {memeCategories.map(cat => (
                       <TabsTrigger key={cat.id} value={cat.id} className="flex-col p-2 h-16 text-xs gap-1">
                         <cat.icon className="h-5 w-5"/>
                         {cat.label}
                       </TabsTrigger>
                   ))}
                </TabsList>
            </Tabs>
            <div className="relative h-[calc(100vh-20rem)] w-full max-w-sm bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute top-0 left-0 right-0 h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar"
                >
                  {filteredMemes.map((meme) => <MemeCard key={meme.id} meme={meme} />)}
                  {filteredMemes.length === 0 && (
                    <div className="h-full w-full snap-start flex-shrink-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                        <Laugh className="h-16 w-16 text-yellow-400 mb-4"/>
                        <h3 className="text-2xl font-bold">No memes here... yet!</h3>
                        <p className="text-muted-foreground">Why not switch to another category to get the laughs rolling?</p>
                    </div>
                  )}
                </div>
            </div>
        </div>
    )
}

function MemeCard({ meme }: { meme: { id: number, category: string, icon: string, text: string, bgColor: string, likes: number, comments: number } }) {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `${action}!`,
            description: `This functionality is under development.`,
        });
    };
    
    const formattedCount = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    }

    return (
        <div className={cn("relative h-full w-full snap-start flex-shrink-0 flex flex-col items-center justify-center text-white text-center p-8", `bg-gradient-to-br ${meme.bgColor}`)}>
            <div className="absolute top-4 left-4 text-6xl opacity-20">{meme.icon}</div>
            <div className="absolute bottom-4 right-4 text-6xl opacity-20">{meme.icon}</div>
            
            <p className="text-3xl md:text-4xl font-bold leading-tight shadow-black/50 text-shadow-lg">
                {meme.text}
            </p>
            
            <div className="absolute bottom-4 right-4 text-white flex flex-col items-center space-y-4">
                 <button className="flex flex-col items-center gap-1" onClick={() => handleAction("Liked")}>
                    <div className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                        <ThumbsUp className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold">{formattedCount(meme.likes)}</span>
                </button>
                <button className="flex flex-col items-center gap-1" onClick={() => handleAction("Commented")}>
                    <div className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                    <MessageCircle className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold">{formattedCount(meme.comments)}</span>
                </button>
                <button className="flex flex-col items-center gap-1" onClick={() => handleAction("Shared")}>
                    <div className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                    <Share2 className="w-7 h-7" />
                    </div>
                </button>
            </div>
        </div>
    );
}
