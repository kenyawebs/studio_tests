import { redirect } from 'next/navigation';

/**
 * The home page of the application.
 *
 * This page immediately redirects the user to the `/dashboard` route.
 *
 * @returns {void} This component does not render anything as it redirects.
 */
export default function Home() {
  redirect('/dashboard');
}
