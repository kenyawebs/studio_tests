
'use client'
import { useEffect, useState, ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Renders its children on the client-side only.
 *
 * This component is a utility to prevent hydration mismatches in Next.js when a
 * component relies on client-side state or APIs (like `window`, `localStorage`,
 * or authentication status). It ensures that the children are only rendered
 * after the component has mounted on the client.
 *
 * @param {ClientOnlyProps} props - The props for the component.
 * @param {ReactNode} props.children - The components to render only on the client.
 * @param {ReactNode} [props.fallback=null] - The component to render on the server and during the initial client render.
 * @returns {JSX.Element} The children if mounted on the client, otherwise the fallback.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
