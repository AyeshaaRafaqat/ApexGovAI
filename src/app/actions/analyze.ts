'use server';

import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

// Define the schema using Zod for robust type safety
const analysisSchema = z.object({
    issues: z.array(z.object({
        title: z.string().describe('Short title of the safety issue (e.g. Exposed Wiring)'),
        description: z.string().describe('Detailed explanation of why this is a hazard in a building context'),
        severity: z.enum(['High', 'Medium', 'Low']),
        regulationHint: z.string().describe('A plausible reference to safety regulations (e.g. Punjab Fire Safety Code 2016)'),
        location: z.string().optional().describe('Where in the image this issue is located'),
    })),
    confidenceScore: z.number().min(0).max(100).describe('Overall confidence score (0-100) that this building has safety violations'),
    summaryUrdu: z.string().describe('A concise 2-sentence summary of the findings in Urdu'),
});

export async function analyzeImage(base64Image: string) {
    try {
        // The base64 string usually comes with "data:image/jpeg;base64," prefix. 
        // We might need to strip it depending on how the SDK expects it, but Vercel SDK often handles data URLs.
        // However, for pure model input, it's safer to just pass the base64 part if using specific providers,
        // but the 'ai' SDK's 'generateObject' handles 'image' parts which take base64 or urls.

        const result = await generateObject({
            model: google('gemini-1.5-flash'),
            schema: analysisSchema,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: 'You are an expert Government Building Inspector in Lahore, Pakistan. Analyze this image for safety violations (fire risks, structural cracks, exposed wiring, overcrowding). Be strict but fair. Provide a confidence score and a summary in Urdu for the local report.' },
                        { type: 'image', image: base64Image },
                    ],
                },
            ],
        });

        return { success: true, data: result.object };
    } catch (error) {
        console.error('Analysis failed:', error);
        return { success: false, error: 'Failed to analyze image. Please try again.' };
    }
}
