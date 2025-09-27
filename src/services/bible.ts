
/**
 * @fileOverview A service for interacting with an external Bible API.
 * This service provides functions to fetch scripture passages.
 */

/**
 * Looks up the text of a given Bible passage using the public `bible-api.com` API.
 *
 * This function takes a scripture reference, fetches the corresponding text,
 * and formats it into a single string with verse numbers. It includes error
 * handling for failed API requests or if the passage is not found.
 *
 * @param {string} passage - The scripture reference to look up (e.g., "John 3:16").
 * @returns {Promise<string>} A promise that resolves to a string containing the formatted text of the passage, or an error message if the lookup fails.
 */
export async function lookupScripture(passage: string): Promise<string> {
    try {
        const response = await fetch(`https://bible-api.com/${encodeURIComponent(passage)}?translation=kjv`);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();

        if (data.error) {
            return `Error fetching scripture: ${data.error}`;
        }
        
        // The API returns verses in an array, join them together.
        const formattedText = data.verses.map((v: any) => `[${v.verse}] ${v.text}`).join(' ').replace(/\n/g, ' ');
        return formattedText || "Passage not found or could not be retrieved.";
    } catch (error) {
        console.error("Error looking up scripture:", error);
        return "An error occurred while trying to look up the scripture.";
    }
}
