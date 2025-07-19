
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, PlusCircle, Heart, Users, Search, Map, Share2 } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CreateEventForm } from "@/components/app/create-event-form";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const initialEvents = [
  {
    id: 1,
    title: "Young Adults Worship Night",
    date: "2025-08-16T19:00:00",
    location: "Main Sanctuary",
    description: "Join us for a powerful night of worship, prayer, and community.",
    type: "Worship",
    rsvps: 128,
    likes: 45,
    isOnline: false
  },
  {
    id: 2,
    title: "Community Food Drive",
    date: "2025-08-17T09:00:00",
    location: "Church Parking Lot",
    description: "Help us serve our city by donating non-perishable food items.",
    type: "Outreach",
    rsvps: 72,
    likes: 30,
    isOnline: false
  },
  {
    id: 3,
    title: "Sunday Morning Service",
    date: "2025-08-18T10:00:00",
    location: "Main Sanctuary",
    description: "Our weekly gathering. All are welcome!",
    type: "Service",
    rsvps: 250,
    likes: 110,
    isOnline: false
  },
  {
    id: 4,
    title: "Theology on Tap (Online)",
    date: "2025-08-20T20:00:00",
    location: "Zoom",
    description: "A casual online discussion about faith and life.",
    type: "Online",
    rsvps: 45,
    likes: 15,
    isOnline: true
  },
];

type Event = typeof initialEvents[0];

export default function EventsPage() {
  const [events, setEvents] = React.useState(initialEvents);
  const [filteredEvents, setFilteredEvents] = React.useState(initialEvents);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  React.useEffect(() => {
    let results = events;
    if (searchTerm) {
      results = results.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter !== 'all') {
      results = results.filter(event => event.type === categoryFilter);
    }
    setFilteredEvents(results);
  }, [searchTerm, categoryFilter, events]);

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
            <CreateEventForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-4 lg:sticky top-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Map className="text-primary"/> Map View</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <Image src="https://placehold.co/600x600.png" width={600} height={600} alt="Map of events" className="object-cover" data-ai-hint="world map pins"/>
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
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Worship">Worship</SelectItem>
                            <SelectItem value="Outreach">Outreach</SelectItem>
                            <SelectItem value="Online">Online</SelectItem>
                            <SelectItem value="Service">Service</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger><SelectValue placeholder="Distance" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">Within 5 miles</SelectItem>
                            <SelectItem value="10">Within 10 miles</SelectItem>
                            <SelectItem value="25">Within 25 miles</SelectItem>
                            <SelectItem value="any">Any distance</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
             </Card>
        </div>
        <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all" onClick={() => setCategoryFilter('all')}>All Events</TabsTrigger>
                  <TabsTrigger value="worship" onClick={() => setCategoryFilter('Worship')}>Worship</TabsTrigger>
                  <TabsTrigger value="outreach" onClick={() => setCategoryFilter('Outreach')}>Outreach</TabsTrigger>
                  <TabsTrigger value="online" onClick={() => setCategoryFilter('Online')}>Online</TabsTrigger>
                </TabsList>
                <TabsContent value={categoryFilter} className="mt-6">
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
    onUpdate({
      ...event,
      rsvps: event.rsvps + (newRsvpState ? 1 : -1)
    });
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
