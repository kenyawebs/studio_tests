
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, PlusCircle, Heart, Users, Search, Map, Share2, RotateCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CreateEventForm } from "@/components/app/create-event-form";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/app/leaflet-map'), { 
    ssr: false,
    loading: () => <div className="aspect-video bg-muted rounded-lg animate-pulse" />
});


const initialEvents = [
  {
    id: 1,
    title: "Community Networking Night",
    date: "2025-08-16T19:00:00",
    location: "Downtown Community Hub",
    description: "Join us for a powerful night of connection, inspiration, and community building.",
    type: "community_building",
    rsvps: 128,
    likes: 45,
    isOnline: false
  },
  {
    id: 2,
    title: "Community Food Drive",
    date: "2025-08-17T09:00:00",
    location: "City Park Pavilion",
    description: "Help us serve our city by donating non-perishable food items.",
    type: "social_impact",
    rsvps: 72,
    likes: 30,
    isOnline: false
  },
  {
    id: 3,
    title: "Weekend Growth Seminar",
    date: "2025-08-18T10:00:00",
    location: "Main Auditorium",
    description: "A weekend gathering focused on personal and professional growth. All are welcome!",
    type: "personal_growth",
    rsvps: 250,
    likes: 110,
    isOnline: false
  },
  {
    id: 4,
    title: "Wellness Workshop (Online)",
    date: "2025-08-20T20:00:00",
    location: "Zoom",
    description: "A casual online discussion about life, wellness, and finding balance.",
    type: "wellness",
    rsvps: 45,
    likes: 15,
    isOnline: true
  },
];

const categories = [
  { id: 'community_building', label: 'Community & Connection', emoji: '🤝' },
  { id: 'personal_growth', label: 'Personal Development', emoji: '🌱' },
  { id: 'social_impact', label: 'Making a Difference', emoji: '💪' },
  { id: 'learning', label: 'Learning & Growth', emoji: '📚' },
  { id: 'wellness', label: 'Health & Wellness', emoji: '💚' },
  { id: 'family_friendly', label: 'Family Events', emoji: '👪' },
  { id: 'networking', label: 'Meet New People', emoji: '🌟' }
];

type Event = typeof initialEvents[0];

export default function EventsPage() {
  const [events, setEvents] = React.useState(initialEvents);
  const [filteredEvents, setFilteredEvents] = React.useState(initialEvents);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [activeTab, setActiveTab] = React.useState("all");

  React.useEffect(() => {
    let results = events;
    if (searchTerm) {
      results = results.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeTab !== 'all') {
      results = results.filter(event => event.type === activeTab);
    }
    setFilteredEvents(results);
  }, [searchTerm, activeTab, events]);
  
  const handleResetFilters = () => {
    setSearchTerm("");
    setActiveTab("all");
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Events Hub</h1>
          <p className="text-muted-foreground">Discover what's happening and get involved.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
             <DialogHeader>
                <DialogTitle>Create a New Event</DialogTitle>
                <DialogDescription>
                  Fill out the details below to create a new event. All events are subject to admin approval before being published.
                </DialogDescription>
            </DialogHeader>
            <CreateEventForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 space-y-4 md:sticky top-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Map className="text-primary"/> Event Locations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                       <LeafletMap />
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search events..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={activeTab} onValueChange={setActiveTab}>
                        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map(cat => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.emoji} {cat.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     <Button variant="outline" className="w-full" onClick={handleResetFilters}>
                        <RotateCw className="mr-2 h-4 w-4" /> Reset Filters
                     </Button>
                </CardContent>
             </Card>
        </div>
        <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="community_building">Community</TabsTrigger>
                  <TabsTrigger value="social_impact">Impact</TabsTrigger>
                  <TabsTrigger value="wellness">Wellness</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-6">
                  <div className="grid gap-4">
                      {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                          <EventCard key={event.id} event={event} onUpdate={handleUpdateEvent} />
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center">No events match the current filters.</p>
                      )}
                  </div>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, onUpdate }: { event: Event, onUpdate: (event: Event) => void }) {
  const { toast } = useToast();
  const [isRsvpd, setIsRsvpd] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onUpdate({
      ...event,
      likes: event.likes + (newLikedState ? 1 : -1)
    });
  };

  const handleRsvp = () => {
    const newRsvpState = !isRsvpd;
    setIsRsvpd(newRsvpState);
    toast({
      title: newRsvpState ? "You're Going!" : "RSVP Canceled",
      description: `You have successfully ${newRsvpState ? 'RSVP\'d for' : 'canceled your RSVP for'} "${event.title}".`
    });
  };

  const handleShare = (platform: string) => {
    toast({
        title: "Shared!",
        description: `This event has been shared to ${platform}. (This is a demo).`
    })
  }
  
  const eventDate = new Date(event.date);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{eventDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {eventDate.toLocaleTimeString(undefined, { hour: '2-digit', minute:'2-digit' })}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
               <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">{event.rsvps}</span> Going
               </div>
               <div className="flex items-center gap-1.5">
                  <Heart className={cn("w-4 h-4", isLiked && "text-destructive")} />
                  <span className="font-semibold">{event.likes}</span> Likes
               </div>
          </div>
          <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleLike}>
                  <Heart className={cn("w-4 h-4", isLiked && "fill-destructive text-destructive")} />
              </Button>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline"><Share2 className="w-4 h-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleShare('WhatsApp')}>Share to WhatsApp</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare('Facebook')}>Share to Facebook</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare('Copying Link')}>Copy Link</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={handleRsvp} variant={isRsvpd ? 'secondary' : 'default'}>{isRsvpd ? 'Going!' : 'RSVP'}</Button>
          </div>
      </CardFooter>
    </Card>
  )
}
