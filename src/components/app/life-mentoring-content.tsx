
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserCheck, MessageSquare, BookOpen, Briefcase, Heart, Building2, Wand2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { MentorApplicationForm } from "@/components/app/mentor-application-form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const mentors = [
  { name: "John Smith", avatar: "https://placehold.co/100x100/a5b4fc/1e3a8a.png", aiHint: "man smiling", role: "Leadership Coach", specialties: ["Leadership", "Career Growth", "Personal Development"] },
  { name: "Maria Garcia", avatar: "https://placehold.co/100x100/f9a8d4/4c1d95.png", aiHint: "woman portrait", role: "Creative Director", specialties: ["Creativity", "Life Purpose", "Inspiration"] },
  { name: "David Chen", avatar: "https://placehold.co/100x100/a7f3d0/065f46.png", aiHint: "man outdoors", role: "Youth Counselor", specialties: ["Youth Mentoring", "Life Transitions", "Communication"] },
  { name: "Sarah Kim", avatar: "https://placehold.co/100x100/fed7aa/9a3412.png", aiHint: "woman professional", role: "Entrepreneur", specialties: ["Business", "Financial Wisdom", "Goal Achievement"] },
  { name: "The Jacksons", avatar: "https://placehold.co/100x100/d8b4fe/581c87.png", aiHint: "happy couple", role: "Relationship Coaches", specialties: ["Marriage Counseling", "Family Life", "Relationships"] },
  { name: "Dr. Evans", avatar: "https://placehold.co/100x100/a5f3fc/0e7490.png", aiHint: "professional man", role: "Certified Counselor", specialties: ["Mental Health", "Emotional Wellness", "Overcoming Challenges"] },
]

const recentPosts = [
  { user: "John Smith", title: "On the importance of a personal mission statement", snippet: "In our fast-paced world, knowing your 'why' is a revolutionary act..." },
  { user: "Maria Garcia", title: "Finding inspiration in everyday life", snippet: "Sometimes creativity isn't about big moments, but the quiet observations..." },
  { user: "Sarah Kim", title: "Bringing your values into your workplace", snippet: "How can we be a positive influence? It starts with excellence and integrity..." },
]

export function LifeMentoringContent() {
  const { toast } = useToast();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Life Mentoring Network</h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">Find mentors, become a mentor, grow together in life.</p>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Find a Mentor</h2>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search by name..." className="pl-10 h-11" />
                </div>
                 <Select>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Filter by Specialty" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leadership"><Building2 className="mr-2"/>Leadership</SelectItem>
                    <SelectItem value="marriage"><Heart className="mr-2"/>Marriage & Family</SelectItem>
                    <SelectItem value="business"><Briefcase className="mr-2"/>Business & Career</SelectItem>
                    <SelectItem value="mental-health">Mental Health</SelectItem>
                  </SelectContent>
                </Select>
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:grid-cols-2">
              {mentors.map(mentor => (
                  <Card key={mentor.name}>
                      <CardContent className="p-6 text-center flex flex-col items-center">
                          <Avatar className="h-24 w-24 mb-4">
                              <AvatarImage src={mentor.avatar} data-ai-hint={mentor.aiHint} />
                              <AvatarFallback>{mentor.name.slice(0,2)}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-lg">{mentor.name}</h3>
                          <p className="text-muted-foreground text-sm">{mentor.role}</p>
                          <div className="flex flex-wrap gap-2 justify-center mt-4">
                              {mentor.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                          </div>
                      </CardContent>
                      <CardFooter className="p-4 border-t">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">Request Mentorship</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Request Mentorship from {mentor.name}</DialogTitle>
                                <DialogDescription>
                                    Share a bit about why you're seeking guidance. You can use the AI assistant to help you draft a clear and thoughtful request.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                  <Textarea 
                                    placeholder={`Hi ${mentor.name},\n\nI'm seeking mentorship because...`} 
                                    className="min-h-[150px]"
                                  />
                                  <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline"><Wand2 className="mr-2"/>AI Assistant</Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>AI Assistant: Draft Your Request</DialogTitle>
                                            <DialogDescription>Tell the AI what you want to say, and it will help you craft a message to {mentor.name}.</DialogDescription>
                                        </DialogHeader>
                                         <div className="space-y-4">
                                            <Textarea placeholder="e.g., Help me ask for guidance on my career path and how to integrate my values." className="min-h-[100px]"/>
                                            <Button>Generate Draft</Button>
                                            <Card className="bg-muted">
                                                <CardContent className="p-4 text-sm">
                                                    AI-generated draft will appear here.
                                                </CardContent>
                                            </Card>
                                        </div>
                                      </DialogContent>
                                  </Dialog>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button onClick={() => toast({ title: "Request Sent!", description: `Your mentorship request to ${mentor.name} has been sent.` })}>Send Request</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                      </CardFooter>
                  </Card>
              ))}
          </div>
      </div>
      <div className="md:col-span-1 space-y-6 md:sticky top-8">
          <Card className="bg-primary/5">
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2"><UserCheck />Become a Mentor</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-sm mt-1">Invest in others by sharing your wisdom and experience. Your story is valuable.</p>
                <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-4">
                          Apply to be a Mentor
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle>Apply to be a Mentor</DialogTitle>
                            <DialogDescription>
                            Thank you for your interest in investing in our community. Please fill out the form below.
                            </DialogDescription>
                        </DialogHeader>
                        <MentorApplicationForm />
                    </DialogContent>
                </Dialog>
            </CardContent>
          </Card>
          <Card>
              <CardHeader>
                  <CardTitle><BookOpen className="inline-block mr-2"/>Wisdom Posts</CardTitle>
                  <CardDescription>Recent insights from our mentors.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  {recentPosts.map(post => (
                      <div key={post.title} className="p-3 rounded-md border">
                          <p className="font-semibold text-sm">{post.title}</p>
                          <p className="text-xs text-muted-foreground mb-1">by {post.user}</p>
                          <p className="text-sm text-muted-foreground truncate">{post.snippet}</p>
                      </div>
                  ))}
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle><MessageSquare className="inline-block mr-2"/>Discussion Panel</CardTitle>
                  <CardDescription>Ask questions and discuss topics with the community.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button className="w-full" onClick={() => toast({ title: "Feature Coming Soon!" })}>Join the Discussion</Button>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
