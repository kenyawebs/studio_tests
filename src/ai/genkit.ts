import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// This configuration now uses Vertex AI, which leverages your Google Cloud
// project's authentication and does not require a separate API key.
// Ensure your environment is authenticated with 'gcloud auth application-default login'.
/**
 * Genkit AI configuration.
 *
 * This configuration initializes the Genkit AI framework with the Google AI plugin,
 * specifically using Vertex AI. It reads the Google Cloud project ID and location
 * from the environment variables `GCLOUD_PROJECT` and `GCLOUD_LOCATION` or the
 * gcloud CLI configuration.
 *
 * @see https://genkit.dev/docs/
 */
export const ai = genkit({
  plugins: [
    googleAI({
      vertex: {
        // Your Google Cloud project ID will be read from the GCLOUD_PROJECT
        // environment variable or the gcloud CLI configuration.
        // Your location (e.g., 'us-central1') will be read from GCLOUD_LOCATION.
      },
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
