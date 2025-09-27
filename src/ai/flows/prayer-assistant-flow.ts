
'use server';
/**
 * @fileOverview An AI assistant for writing prayers.
 *
 * - askPrayerAssistant - A function that helps users craft prayers.
 * - PrayerAssistantInput - The input type for the askPrayerAssistant function.
 * - PrayerAssistantOutput - The return type for the askPrayerAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrayerAssistantInput = z.object({
  topic: z.string().describe("The user's topic or concern."),
});
export type PrayerAssistantInput = z.infer<typeof PrayerAssistantInput>;

const PrayerAssistantOutput = z.object({
    prayer: z.string().describe('The AI-generated prayer or message of encouragement.'),
});
export type PrayerAssistantOutput = z.infer<typeof PrayerAssistantOutput>;

/**
 * Helps users craft prayers.
 *
 * This function takes a user's topic or concern, processes it through the
 * `prayerAssistantFlow`, and returns an AI-generated prayer or message of
 * encouragement.
 *
 * @param {PrayerAssistantInput} input - The user's topic or concern.
 * @returns {Promise<PrayerAssistantOutput>} A promise that resolves to the AI-generated prayer or message.
 */
export async function askPrayerAssistant(input: PrayerAssistantInput): Promise<PrayerAssistantOutput> {
  return prayerAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prayerAssistantPrompt',
  input: {schema: PrayerAssistantInput},
  output: {schema: PrayerAssistantOutput},
  prompt: `You are a compassionate AI companion helping people find peace and guidance in life's challenges.

A user has expressed a concern: "{{{topic}}}"

INSTRUCTIONS:
1. Offer a thoughtful, encouraging response that helps with their concern.
2. Use inclusive, welcoming language that doesn't assume a specific religious background.
3. If the topic is spiritual, you can provide a gentle, biblically-based prayer.
4. Focus on hope, peace, and practical guidance.
5. Be a source of comfort and strength.
6. Always be respectful of where the user is in their journey.

Provide guidance that meets them exactly where they are. Frame the response as a single, encouraging message or prayer.`,
});

const prayerAssistantFlow = ai.defineFlow(
  {
    name: 'prayerAssistantFlow',
    inputSchema: PrayerAssistantInput,
    outputSchema: PrayerAssistantOutput,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
