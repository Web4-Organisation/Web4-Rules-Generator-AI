'use server';
/**
 * @fileOverview Generates a draft set of community rules from a text prompt.
 *
 * - generateCommunityRules - A function that generates community rules based on a text prompt.
 * - GenerateCommunityRulesInput - The input type for the generateCommunityRules function.
 * - GenerateCommunityRulesOutput - The return type for the generateCommunityRules function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCommunityRulesInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the type of community.'),
});
export type GenerateCommunityRulesInput = z.infer<typeof GenerateCommunityRulesInputSchema>;

const GenerateCommunityRulesOutputSchema = z.object({
  rules: z.string().describe('The generated community rules.'),
});
export type GenerateCommunityRulesOutput = z.infer<typeof GenerateCommunityRulesOutputSchema>;

export async function generateCommunityRules(input: GenerateCommunityRulesInput): Promise<GenerateCommunityRulesOutput> {
  return generateCommunityRulesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCommunityRulesPrompt',
  input: {schema: GenerateCommunityRulesInputSchema},
  output: {schema: GenerateCommunityRulesOutputSchema},
  prompt: `You are an AI assistant that generates community rules based on a description of the community.

  Generate a set of rules for the following type of community: {{{prompt}}}
  The rules should be clear, concise, and easy to understand.
  The rules should cover topics such as:
    * Respectful communication
    * Content guidelines
    * Behavior expectations
    * Consequences for violations

  The output MUST only contain the rules, without any introductory or concluding remarks.
  Each rule MUST be on a newline.
  Do not include any preamble or explanation, and do not number the rules.
  `,
});

const generateCommunityRulesFlow = ai.defineFlow(
  {
    name: 'generateCommunityRulesFlow',
    inputSchema: GenerateCommunityRulesInputSchema,
    outputSchema: GenerateCommunityRulesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
