// src/ai/flows/generate-community-rules.ts
'use server';

/**
 * @fileOverview Generates a draft set of community rules based on tags using AI.
 *
 * - generateCommunityRulesFromTags - A function that generates community rules based on tags.
 * - GenerateCommunityRulesFromTagsInput - The input type for the generateCommunityRulesFromTags function.
 * - GenerateCommunityRulesFromTagsOutput - The return type for the generateCommunityRulesFromTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCommunityRulesFromTagsInputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('An array of tags that describe the community type.'),
});
export type GenerateCommunityRulesFromTagsInput = z.infer<
  typeof GenerateCommunityRulesFromTagsInputSchema
>;

const GenerateCommunityRulesFromTagsOutputSchema = z.object({
  rules: z.string().describe('The generated community rules.'),
});
export type GenerateCommunityRulesFromTagsOutput = z.infer<
  typeof GenerateCommunityRulesFromTagsOutputSchema
>;

export async function generateCommunityRulesFromTags(
  input: GenerateCommunityRulesFromTagsInput
): Promise<GenerateCommunityRulesFromTagsOutput> {
  return generateCommunityRulesFromTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCommunityRulesFromTagsPrompt',
  input: {schema: GenerateCommunityRulesFromTagsInputSchema},
  output: {schema: GenerateCommunityRulesFromTagsOutputSchema},
  prompt: `You are an AI assistant designed to generate community rules based on given tags.

  The community is described by the following tags:
  {{#each tags}}
  - {{{this}}}
  {{/each}}

  Generate a comprehensive set of rules covering aspects like:
  - Respectful communication and behavior
  - Content guidelines and restrictions
  - Consequences of rule violations
  - Guidelines for moderators

  The generated rules should be clear, concise, and easily understandable by all community members.
  Return the rules as a single string.
  `,
});

const generateCommunityRulesFromTagsFlow = ai.defineFlow(
  {
    name: 'generateCommunityRulesFromTagsFlow',
    inputSchema: GenerateCommunityRulesFromTagsInputSchema,
    outputSchema: GenerateCommunityRulesFromTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
