
'use server';
/**
 * @fileOverview A Bible chat AI agent with a tool to look up scripture.
 *
 * - askBibleAi - A function that handles the Bible chat process.
 * - BibleChatInput - The input type for the askBibleAi function.
 * - BibleChatOutput - The return type for the askBibleAi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { lookupScripture } from '@/services/bible';

const BibleChatInputSchema = z.object({
  question: z.string().describe("The user's question about life or scripture."),
});
export type BibleChatInput = z.infer<typeof BibleChatInputSchema>;

const BibleChatOutputSchema = z.object({
    answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type BibleChatOutput = z.infer<typeof BibleChatOutputSchema>;


export async function askBibleAi(input: BibleChatInput): Promise<BibleChatOutput> {
  return bibleChatFlow(input);
}

const scriptureLookupTool = ai.defineTool(
    {
        name: 'lookupScripture',
        description: 'Looks up the text of a specific scripture passage from ancient wisdom texts (e.g., "John 3:16" or "Romans 12:1-2").',
        inputSchema: z.object({
            passage: z.string().describe('The passage to look up, e.g., "John 3:16" or "Romans 12:1-2".'),
        }),
        outputSchema: z.string(),
    },
    async (input) => lookupScripture(input.passage)
);

const prompt = ai.definePrompt({
  name: 'bibleChatPrompt',
  input: {schema: BibleChatInputSchema},
  output: {schema: BibleChatOutputSchema},
  tools: [scriptureLookupTool],
  prompt: `You are a wise, compassionate life guidance AI helping people find wisdom and peace in life's challenges. Your knowledge is based on ancient wisdom texts.

A user has asked: "{{{question}}}"

INSTRUCTIONS:
1. Provide a thoughtful, practical answer that helps with their question.
2. If the user asks about a specific passage, you MUST use the 'lookupScripture' tool to retrieve the text first.
3. If relevant, gently share wisdom from these ancient texts, citing the source (e.g., John 3:16).
4. Use inclusive language that welcomes people from all backgrounds.
5. Focus on hope, healing, and practical guidance.
6. Meet them exactly where they are in their journey.

Your primary goal is to provide wisdom that helps people navigate life's challenges with hope and peace.`,
});

const bibleChatFlow = ai.defineFlow(
  {
    name: 'bibleChatFlow',
    inputSchema: BibleChatInputSchema,
    outputSchema: BibleChatOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
