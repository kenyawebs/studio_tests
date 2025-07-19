
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  title: z.string().min(5, { message: "Please provide a short, descriptive title." }),
  description: z.string().min(20, { message: "Please describe the opportunity and the problem it solves (at least 20 characters)." }),
  impact: z.string().min(10, { message: "Please describe the expected impact on the community." }),
  urgency: z.enum(["immediate", "soon", "planned"], { required_error: "Please select the urgency level."}),
  resources: z.string().optional(),
});


export function SuggestOpportunityForm() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      impact: "",
      resources: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Suggestion Sent!",
      description: "Thank you for your feedback. Our team will review your idea for a new community initiative.",
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Suggest a Community Impact Opportunity</DialogTitle>
        <DialogDescription>
          Have an idea for how our community can serve? Let us know! Your suggestion will be sent to the admin team for consideration.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Opportunity Title</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Park Cleanup Day" {...field} />
                    </FormControl>
                    <FormDescription>What would you call this initiative?</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                    <Textarea placeholder="What problem does this solve? Who benefits from this? How does it create positive change in the community?" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="impact"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Expected Community Impact</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Cleaner parks, stronger community bonds" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>How urgent is this need?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="immediate">Immediate - Critical community need</SelectItem>
                            <SelectItem value="soon">Within 1-3 months</SelectItem>
                            <SelectItem value="planned">Long-term planning</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="resources"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Resources Needed (Optional)</FormLabel>
                    <FormControl>
                    <Textarea placeholder="What support, materials, or skills are required to make this happen?" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <DialogFooter className="pt-4">
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Submit Community Impact Suggestion</Button>
            </DialogFooter>
        </form>
      </Form>
    </>
  );
}
