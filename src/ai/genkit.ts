import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// This configuration now uses Vertex AI, which leverages your Google Cloud
// project's authentication and does not require a separate API key.
// Ensure your environment is authenticated with 'gcloud auth application-default login'.
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
