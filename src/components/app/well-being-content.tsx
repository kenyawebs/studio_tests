
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, CalendarPlus, Ear, HeartPulse, Users, Scale, ShieldCheck, LifeBuoy, Baby, FileCheck, Phone, UserCheck, Send, Bot, Wand2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ProviderRegistrationForm } from "@/components/app/provider-registration-form";
import { BookSessionForm } from "@/components/app/book-session-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

const resources = [
  {
    icon: Ear,
    title: "Guided Prayer & Meditation",
    description: "Audio-led sessions to help you find peace. Let our AI guide you through a reflective session.",
    cta: "Start a Session",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: BrainCircuit,
    title: "Stress & Anxiety",
    description: "Find biblical wisdom and practical steps for navigating anxiety. Ask our AI for initial guidance.",
    cta: "Get Guidance",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Addiction & Recovery",
    description: "Find support and resources for overcoming addictions. Our AI can provide confidential first steps.",
    cta: "Find Help",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
   {
    icon: Scale,
    title: "Conflict Resolution",
    description: "Request help resolving conflicts, with AI assistance to articulate your thoughts.",
    cta: "Get Assistance",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
   {
    icon: Baby,
    title: "Marriage & Family",
    description: "Resources for Christ-centered families. Get AI-powered conversation starters.",
    cta: "Strengthen Family",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
    {
    icon: FileCheck,
    title: "Legal & Financial",
    description: "Connect with Christian professionals. Use our AI to help formulate your questions.",
    cta: "Seek Counsel",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Users,
    title: "Support Groups",
    description: "Join others who understand. Find the right group for you.",
    cta: "Browse Groups",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

const providers = [
    { name: "Dr. Evans", avatar: "https://placehold.co/100x100/a5f3fc/0e7490.png", aiHint: "professional man", credentials: "PhD, Certified Counselor", specialties: ["Mental Health", "Pastoral Care", "Theology"], verified: true, approach: "Integrates faith-based principles with evidence-based therapeutic practices.", languages: ["English", "Swahili"], availability: "Mon-Fri, 9am - 5pm", rate: "120" },
    { name: "The Jacksons", avatar: "https://placehold.co/100x100/d8b4fe/581c87.png", aiHint: "happy couple", credentials: "Certified Relationship Coaches", specialties: ["Marriage Counseling", "Family", "Relationships"], verified: true, approach: "Focuses on communication and building strong, lasting bonds.", languages: ["English"], availability: "Evenings & Weekends", rate: "150" },
    { name: "Sarah Kim", avatar: "https://placehold.co/100x100/fed7aa/9a3412.png", aiHint: "woman professional", credentials: "Financial Advisor", specialties: ["Financial Guidance", "Career Coaching"], verified: true, approach: "Provides practical, values-driven financial and career advice.", languages: ["English", "Korean"], availability: "By appointment", rate: "100" },
     { name: "David Chen", avatar: "https://placehold.co/100x100/a7f3d0/065f46.png", aiHint: "man outdoors", credentials: "Certified Mediator", specialties: ["Conflict Resolution", "Mediation"], verified: true, approach: "Helps parties find common ground and peaceful resolutions.", languages: ["English"], availability: "Flexible", rate: "90" },
];

function AiAssistantDialog({ title, description, trigger }: { title: string, description: string, trigger: React.ReactNode }) {
  const [messages, setMessages] = React.useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSend = () => {
    if (!input) return;
    setIsLoading(true);
    const newMessages = [...messages, { role: 'user' as const, text: input }];
    setMessages(newMessages);
    setInput('');
    setTimeout(() => {
      setMessages([...newMessages, { role: 'bot' as const, text: `Thank you for sharing about ${title}. It takes courage to seek guidance. While I'm an AI and can't offer professional advice, I can provide some initial thoughts and resources based on timeless wisdom. It's often helpful to start by...` }]);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>AI Assistant: {title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="h-[50vh] flex flex-col">
            <ScrollArea className="flex-1 p-4 border rounded-md bg-muted/50">
              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot/></AvatarFallback>
                    </Avatar>
                    <div className="bg-background p-3 rounded-lg text-sm">
                        <p>Hello! How can I help you with {title} today? Feel free to ask any questions you have.</p>
                    </div>
                </div>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'bot' && (
                        <Avatar className="h-8 w-8 border">
                            <AvatarFallback><Bot/></AvatarFallback>
                        </Avatar>
                    )}
                     <div className={`p-3 rounded-lg text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                        <p>{msg.text}</p>
                    </div>
                     {msg.role === 'user' && isLoading && (
                        <Avatar className="h-8 w-8 border">
                            <AvatarFallback><UserCheck/></AvatarFallback>
                        </Avatar>
                     )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4 flex gap-2">
              <Textarea 
                placeholder="Ask a question..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
              />
              <Button onClick={handleSend} disabled={isLoading}><Send/></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
}

function ProviderProfileDialog({ provider, trigger }: { provider: typeof providers[0], trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Provider Profile</DialogTitle>
          <DialogDescription>Details for {provider.name}.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center text-center gap-4 pt-4">
            <Avatar className="h-24 w-24">
                <AvatarImage src={provider.avatar} data-ai-hint={provider.aiHint} />
                <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="text-2xl font-bold">{provider.name}</h3>
                <p className="text-muted-foreground">{provider.credentials}</p>
            </div>
        </div>
        <div className="space-y-4 py-4">
            <p className="text-sm text-center text-muted-foreground italic">&quot;{provider.approach}&quot;</p>
            <div>
              <h4 className="font-semibold">Specialties</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                  {provider.specialties.map(s => <Badge key={s}>{s}</Badge>)}
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Availability</h4>
              <p className="text-sm text-muted-foreground">{provider.availability}</p>
            </div>
            <div>
              <h4 className="font-semibold">Session Rate</h4>
              <p className="text-sm text-muted-foreground">${provider.rate} / session</p>
            </div>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">Book a Consultation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Book a Confidential Session</DialogTitle>
                  <DialogDescription>Connect with a trained lay counselor or pastor for support. Your request is private and secure.</DialogDescription>
                </DialogHeader>
                <BookSessionForm />
            </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}

const helplines = {
    crisis: [
        { name: "Suicide & Crisis Lifeline (US)", number: "988", website: "https://988lifeline.org/" },
        { name: "Samaritans (UK)", number: "116 123", website: "https://www.samaritans.org/" },
        { name: "Mentally Aware Nigeria (NG)", number: "+234 806 210 6493", website: "https://www.mentallyaware.org/" },
        { name: "Kenya Red Cross", number: "+254 722 178 177", website: "https://www.redcross.or.ke/" },
        { name: "Crisis Text Line (International)", number: "Text HOME to 741741", website: "https://www.crisistextline.org/" },
    ],
    mental_health: [
        { name: "NAMI Helpline (US)", number: "1-800-950-NAMI (6264)", website: "https://www.nami.org/help" },
        { name: "Find a Helpline (Global)", number: "Website", website: "https://findahelpline.com/" },
    ]
}

function CallHelplineDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full"><Phone className="mr-2"/> Call a Helpline</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Global Support Helplines</DialogTitle>
                    <DialogDescription>
                        If you are in immediate crisis, please reach out. You are not alone.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <h4 className="font-semibold mb-2">Crisis & Suicide Support</h4>
                        <div className="space-y-2">
                        {helplines.crisis.map(line => (
                             <a key={line.name} href={line.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                                <span>{line.name}</span>
                                <span className="font-mono text-primary">{line.number}</span>
                            </a>
                        ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Mental Health Support</h4>
                         <div className="space-y-2">
                        {helplines.mental_health.map(line => (
                             <a key={line.name} href={line.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                                <span>{line.name}</span>
                                <span className="font-mono text-primary">{line.number}</span>
                            </a>
                        ))}
                         </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export function WellBeingContent() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <HeartPulse className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Mental & Spiritual Well-being Hub</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Caring for your soul and mind is vital. Here are some resources to support your journey towards wholeness.
        </p>
      </div>

       <Card className="bg-gradient-to-r from-primary/80 to-amber-500 text-primary-foreground">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2"><CalendarPlus/> Book a Confidential Session</CardTitle>
              <CardDescription className="text-primary-foreground/80">Connect with a trained lay counselor or pastor for support. Your request is private and secure.</CardDescription>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" size="lg" className="shrink-0">Request an Appointment</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Book a Confidential Session</DialogTitle>
                      <DialogDescription>Connect with a trained lay counselor or pastor for support. Your request is private and secure.</DialogDescription>
                    </DialogHeader>
                    <BookSessionForm />
                </DialogContent>
            </Dialog>
        </CardHeader>
      </Card>
      
       <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Are you a professional?</CardTitle>
                    <CardDescription>Partner with us to provide care and support to the community. All registrations are subject to verification.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full">Register to Provide Services</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                              <DialogTitle>Register as a Provider</DialogTitle>
                              <DialogDescription>Thank you for your interest. Please fill out the form below. Your submission will be reviewed by an admin.</DialogDescription>
                            </DialogHeader>
                            <ProviderRegistrationForm />
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Find a Provider</CardTitle>
                    <CardDescription>Browse our directory of verified well-being professionals and pastoral counselors.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    {providers.map(provider => (
                        <Card key={provider.name} className="flex flex-col">
                            <CardHeader className="flex-row gap-4 items-center">
                                <Avatar>
                                    <AvatarImage src={provider.avatar} data-ai-hint={provider.aiHint}/>
                                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold flex items-center gap-1.5">{provider.name} {provider.verified && <UserCheck className="h-4 w-4 text-green-500"/>}</h3>
                                    <p className="text-sm text-muted-foreground">{provider.credentials}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-1">
                                    {provider.specialties.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <ProviderProfileDialog provider={provider} trigger={<Button variant="outline" className="w-full">View Profile</Button>} />
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resource Library</CardTitle>
                    <CardDescription>Explore articles, guides, and tools for your well-being journey.</CardDescription>
                </CardHeader>
                 <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {resources.map(res => (
                       <Card key={res.title} className="flex flex-col">
                            <CardHeader className="flex-grow">
                                <div className="flex flex-col items-center text-center">
                                    <div className={`p-3 rounded-full mb-3 ${res.bg}`}>
                                        <res.icon className={`w-6 h-6 ${res.color}`} />
                                    </div>
                                    <h3 className="font-semibold text-base">{res.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-2">{res.description}</p>
                                </div>
                            </CardHeader>
                            <CardFooter>
                                <AiAssistantDialog 
                                  title={res.title} 
                                  description={res.description}
                                  trigger={<Button className="w-full" variant="secondary"><Wand2 className="mr-2"/>Ask AI</Button>}
                                />
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1 space-y-6 lg:sticky top-8">
            <Card className="bg-destructive/10 border-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive"><LifeBuoy/> Emergency Support</CardTitle>
                    <CardDescription className="text-destructive/90">If you are in immediate crisis, please contact a professional.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CallHelplineDialog />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
