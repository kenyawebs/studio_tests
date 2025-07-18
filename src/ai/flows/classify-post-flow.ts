
'use server';
/**
 * @fileOverview An AI flow for classifying social post content into a spiritual category.
 *
 * - classifyPost - A function that analyzes post text and returns a category.
 * - ClassifyPostInput - The input type for the classifyPost function.
 * - ClassifyPostOutput - The return type for the classifyPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyPostInputSchema = z.object({
  content: z.string().describe("The user's post content to be classified."),
});
export type ClassifyPostInput = z.infer<typeof ClassifyPostInputSchema>;

const ClassifyPostOutputSchema = z.object({
    category: z.enum(['breakthrough', 'healing', 'provision', 'restoration', 'calling', 'growth'])
        .describe("The single most relevant spiritual category for the post."),
});
export type ClassifyPostOutput = z.infer<typeof ClassifyPostOutputSchema>;


export async function classifyPost(input: ClassifyPostInput): Promise<ClassifyPostOutput> {
  return classifyPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyPostPrompt',
  input: {schema: ClassifyPostInputSchema},
  output: {schema: ClassifyPostOutputSchema},
  prompt: `You are an AI content moderator for a Christian social media platform. Your task is to classify a user's post into the single most appropriate spiritual category based on its content.

Analyze the post for its primary theme. Here are the categories and their meanings:
- "breakthrough": Miraculous victories, doors opening, obstacles overcome, answered prayers.
- "healing": Testimonies of physical, emotional, or mental restoration.
- "provision": Stories of financial miracles, getting a new job, or material needs being met.
- "restoration": Accounts of healed relationships, reconciliation, or restored situations.
- "calling": Posts about discovering purpose, ministry, or divine assignments.
- "growth": Reflections on spiritual maturity, learning, discipleship, or personal development.

Post Content:
"{{{content}}}"

Based on this content, determine the most fitting category from the list and return it.
`,
});

const classifyPostFlow = ai.defineFlow(
  {
    name: 'classifyPostFlow',
    inputSchema: ClassifyPostInputSchema,
    outputSchema: ClassifyPostOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
