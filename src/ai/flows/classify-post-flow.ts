
'use server';
/**
 * @fileOverview An AI flow for classifying social post content into a meaningful category.
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
        .describe("The single most relevant category for the post."),
});
export type ClassifyPostOutput = z.infer<typeof ClassifyPostOutputSchema>;


export async function classifyPost(input: ClassifyPostInput): Promise<ClassifyPostOutput> {
  return classifyPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyPostPrompt',
  input: {schema: ClassifyPostInputSchema},
  output: {schema: ClassifyPostOutputSchema},
  prompt: `You are an AI content moderator for a community platform. Your task is to classify a user's post into the single most appropriate category based on its content.

Analyze the post for its primary theme. Here are the categories and their meanings:
- "breakthrough": Stories of victories, overcoming obstacles, answered prayers.
- "healing": Testimonies of physical, emotional, or mental restoration.
- "provision": Stories of needs being met, whether financial, material, or relational.
- "restoration": Accounts of healed relationships or reconciled situations.
- "calling": Posts about discovering purpose, mission, or new direction.
- "growth": Reflections on personal development, learning, or maturity.

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
