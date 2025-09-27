
'use server';
/**
 * @fileOverview A secure, server-side flow for geocoding addresses using the Google Maps API.
 *
 * - geocodeAddress - Converts a physical address into latitude and longitude.
 * - GeocodeAddressInput - The input type for the geocodeAddress function.
 * - GeocodeAddressOutput - The return type for the geocodeAddress function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Client, GeocodeResponse, Status } from '@googlemaps/google-maps-services-js';

const GeocodeAddressInputSchema = z.object({
  address: z.string().describe('The physical address to be geocoded.'),
});
export type GeocodeAddressInput = z.infer<typeof GeocodeAddressInputSchema>;

const GeocodeAddressOutputSchema = z.object({
  lat: z.number().describe('The latitude of the address.'),
  lng: z.number().describe('The longitude of the address.'),
});
export type GeocodeAddressOutput = z.infer<typeof GeocodeAddressOutputSchema>;

/**
 * Converts a physical address into latitude and longitude.
 *
 * This server-side function securely calls the Google Maps Geocoding API
 * to convert a given address into its corresponding geographic coordinates.
 *
 * @param {GeocodeAddressInput} input - The address to be geocoded.
 * @returns {Promise<GeocodeAddressOutput>} A promise that resolves to the latitude and longitude.
 * @throws {Error} If the API key is missing, if the geocoding fails, or if an internal error occurs.
 */
export async function geocodeAddress(input: GeocodeAddressInput): Promise<GeocodeAddressOutput> {
  return geocodeAddressFlow(input);
}

const mapsClient = new Client({});

const geocodeAddressFlow = ai.defineFlow(
  {
    name: 'geocodeAddressFlow',
    inputSchema: GeocodeAddressInputSchema,
    outputSchema: GeocodeAddressOutputSchema,
  },
  async (input) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error("Google Maps API key is not configured on the server.");
      throw new Error("Server configuration error: Missing Maps API key.");
    }

    try {
      const response: GeocodeResponse = await mapsClient.geocode({
        params: {
          address: input.address,
          key: apiKey,
        },
        timeout: 2000, // milliseconds
      });

      if (response.data.status === Status.OK) {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        console.error("Geocoding API error:", response.data.error_message);
        throw new Error(response.data.error_message || "Failed to geocode address.");
      }
    } catch (error: any) {
        if (error.response) {
             console.error("Geocoding client error:", error.response.data);
             throw new Error(error.response.data.error_message || "An unexpected error occurred during geocoding.");
        }
        console.error("Geocoding flow error:", error);
        throw new Error("An internal error occurred while geocoding the address.");
    }
  }
);
