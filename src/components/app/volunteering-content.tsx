
"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandHelping, Search, PlusCircle, Heart, PenSquare, MapPin, Map, Leaf, Users2, HeartHandshake, Construction } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOpportunityForm } from "@/components/app/create-opportunity-form";
import { cn } from "@/lib/utils";
import { VolunteerApplicationForm } from "@/components/app/volunteer-application-form";
import { SuggestOpportunityForm } from "@/components/app/suggest-opportunity-form";
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/app/leaflet-map'), { 
    ssr: false,
    loading: () => <div className="aspect-square bg-muted rounded-lg animate-pulse" />
});

const opportunityIcons: { [key: string]: React.ElementType } = {
    "Youth Development": Users2,
    "Environmental Impact": Leaf,
    "Community Building": Construction,
    "Food Security": HeartHandshake,
    "Default": HandHelping
};

const opportunities = [
    {
        title: "Youth Development Initiative",
        ministry: "Youth Development",
        location: "Local Community Center",
        commitment: "2 hours/week",
        description: "Support young people in developing essential life skills and finding their path forward in a positive environment.",
        skills: ["Mentoring", "Patience", "Leadership"],
        postedBy: { type: 'NGO', name: 'Future Builders Initiative' },
        likes: 28,
        details: { ageRestriction: "21+", certificateProvided: true }
    },
    {
        title: "Sustainable Community Gardens",
        ministry: "Environmental Impact",
        location: "City Parks",
        commitment: "4 hours/month (weekends)",
        description: "Help transform underused spaces into thriving community gardens that provide food and build local connections.",
        skills: ["Gardening", "Teamwork"],
        postedBy: { type: 'Community Group', name: 'Green Future Coalition' },
        likes: 41,
        details: { foodProvided: "Snacks & Water" }
    },
    {
        title: "Intergenerational Connection Program",
        ministry: "Community Building",
        location: "Various Locations",
        commitment: "Flexible",
        description: "Bridge generational gaps by connecting with older adults, sharing stories, and combating loneliness.",
        skills: ["Listening", "Empathy", "Storytelling"],
        postedBy: { type: 'NGO', name: 'Generations United' },
        likes: 62,
        details: { fareRefund: "Up to $5" }
    },
    {
        title: "Community Nutrition Access",
        ministry: "Food Security",
        location: "Neighborhood Care Network",
        commitment: "3 hours on weekends",
        description: "Ensure everyone has access to nutritious meals. Help prepare and serve food while building community.",
        skills: ["Cooking", "Hospitality"],
        postedBy: { type: 'Church', name: 'Connect Hub Church' },
        likes: 55,
        details: {}
    },
];

/**
 * Renders the main content for the Community Impact Hub.
 *
 * This component provides a comprehensive interface for users to discover and
 * engage with volunteer opportunities. It features a two-column layout with a
 * map and filter controls on the left, and a grid of available opportunities
 * on the right. Users can also suggest new opportunities or post their own
 * through integrated dialog forms.
 *
 * @returns {JSX.Element} The volunteering content component.
 */
export function VolunteeringContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Community Impact Hub</h1>
          <p className="text-muted-foreground mt-1">Find opportunities to make an impact and connect with your community.</p>
        </div>
        <div className="flex gap-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <PenSquare className="mr-2 h-4 w-4" /> Suggest an Opportunity
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <SuggestOpportunityForm />
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Post an Opportunity
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <CreateOpportunityForm />
                </DialogContent>
            </Dialog>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-4 lg:sticky top-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Map className="text-primary"/> Opportunities Near You</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
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
                        <Input placeholder="Search opportunities..." className="pl-10"/>
                    </div>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Impact Area" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="youth">Youth Development</SelectItem>
                            <SelectItem value="environment">Environmental Impact</SelectItem>
                            <SelectItem value="elderly">Community Building</SelectItem>
                            <SelectItem value="hunger">Food Security</SelectItem>
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
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {opportunities.map(opp => <OpportunityCard key={opp.title} opportunity={opp} />)}
            </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a single card for a volunteer opportunity.
 *
 * This component displays the details of a specific volunteer opportunity,
 * including its title, description, location, commitment, and required skills.
 * It also dynamically generates badges for additional details like age restrictions
 * or if food is provided. Users can like an opportunity and apply for it via a
 * dialog that contains the `VolunteerApplicationForm`.
 *
 * @param {{opportunity: object}} props - The props for the component.
 * @param {object} props.opportunity - The opportunity object to display.
 * @returns {JSX.Element} The opportunity card component.
 */
function OpportunityCard({ opportunity }: { opportunity: typeof opportunities[0] }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const Icon = opportunityIcons[opportunity.ministry as keyof typeof opportunityIcons] || opportunityIcons.Default;

  const detailBadges = Object.entries(opportunity.details)
    .map(([key, value]) => {
        if (!value) return null;
        let text = "";
        if (key === 'ageRestriction') text = `Age: ${value}`;
        else if (key === 'foodProvided') text = "Food Provided";
        else if (key === 'certificateProvided') text = "Certificate Provided";
        else if (key === 'stipend' && value !== "None") text = `Stipend: ${value}`;
        else if (key === 'fareRefund') text = `Fare Refund: ${value}`;
        else if (key === 'equipmentNeeded') text = `Requires: ${value}`;
        return text ? <Badge key={key} variant="secondary">{text}</Badge> : null;
    })
    .filter(Boolean);

  return (
    <Card className="flex flex-col h-full">
        <CardHeader>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle>{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.ministry}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
            <p className="text-sm text-muted-foreground">{opportunity.description}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{opportunity.location}</span>
                </div>
                <p><span className="font-semibold text-foreground">Commitment:</span> {opportunity.commitment}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {opportunity.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
            </div>
             {detailBadges.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t mt-4">
                    {detailBadges}
                </div>
            )}
        </CardContent>
        <CardFooter className="border-t pt-4">
            <div className="flex justify-between items-center w-full gap-2">
                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsLiked(p => !p)}>
                    <Heart className={cn("w-4 h-4 text-muted-foreground", isLiked && "fill-destructive text-destructive")} />
                </Button>
                <div className="flex items-center gap-1 flex-shrink-0">
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm">Apply Now</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                           <VolunteerApplicationForm opportunityTitle={opportunity.title} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </CardFooter>
    </Card>
  );
}
