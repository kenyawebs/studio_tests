# TODO: Resolve "Map container is already initialized" Error

This document outlines a persistent, critical bug related to the Leaflet.js map component integration. It is intended for review by a senior developer or an advanced AI assistant like GitHub Copilot to provide a definitive architectural solution.

## 1. The Problem

The application crashes with the error `Error: Map container is already initialized.` whenever a user navigates to a page containing the map, specifically the **Events Hub** and **Community Impact Hub**.

This error occurs because the Leaflet library, which is not a native React component, is attempting to initialize itself on an HTML DOM element that it has already taken control of. This conflict is exacerbated by React's Strict Mode, which can cause `useEffect` hooks to run twice in development, making the issue more prominent.

## 2. History of Failed Fixes

Multiple attempts to solve this have failed, indicating a fundamental architectural issue. The attempted solutions included:

- **Initial Implementation:** Using `react-leaflet` components directly, which led to the initialization error.
- **Dynamic Import:** Wrapping the map component in a `next/dynamic` import with `ssr: false` to ensure it only runs on the client. This did not solve the re-initialization problem.
- **Dedicated Component Wrapper:** Creating a `LeafletMap` component to encapsulate the logic.
- **useEffect with Cleanup:** Implementing a `useEffect` hook within the dedicated component to create the map instance and a `return` cleanup function to destroy it.

Despite these efforts, the issue persists, suggesting a subtle race condition or a deeper conflict with the component's lifecycle when navigating between pages.

## 3. Cause & Effect Analysis

- **Cause:** The root cause is an improper handling of the lifecycle of a non-React library (Leaflet) within a React/Next.js application. The map instance is not being reliably destroyed before the component re-renders on navigation, leading to the re-initialization crash.
- **Affected Files:**
    - `src/app/(main)/events/page.tsx`
    - `src/app/(main)/volunteering/page.tsx`
    - `src/components/app/leaflet-map.tsx` (The wrapper component that has been removed as part of this stabilization effort).
- **Effect:** The app is unstable. Any page with a map is unusable, blocking core features. This also contributes to a perception of overall application slowness and instability.

## 4. Recommended Path Forward (For Review)

A fresh, more robust approach is required. The next attempt to fix this should consider the following:

- **Singleton Pattern:** Can we ensure only one instance of the Leaflet map is ever created and simply moved or re-parented in the DOM as needed? This is an advanced pattern but may be necessary.
- **State Management:** Is the component state being reset properly on navigation? Using a `key` prop on the map component (`<LeafletMap key={uniqueId} />`) that changes on every route could force a full unmount and remount, which might solve the issue.
- **Alternative Libraries:** While a last resort, if Leaflet proves too difficult to integrate reliably, exploring a different mapping library designed specifically for React (like `google-map-react`) might be a pragmatic solution.
- **External Dependencies:** The `react-leaflet` library is a third-party wrapper. There may be an underlying issue or incompatibility with the current versions of React or Next.js.

**Action Item:** The current map component has been REMOVED from the UI to stabilize the application. The next developer or AI should focus on re-implementing the map using a more resilient architectural pattern based on the recommendations above.
