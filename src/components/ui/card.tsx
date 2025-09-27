import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A container component that groups related content.
 * This is the root component for a card.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - The ref for the component.
 * @returns {JSX.Element} The card component.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * The header section of a card, typically containing a title and description.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - The ref for the component.
 * @returns {JSX.Element} The card header component.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * The title for a card, to be used within a `CardHeader`.
 *
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - The props for the component.
 * @param {React.Ref<HTMLHeadingElement>} ref - The ref for the component.
 * @returns {JSX.Element} The card title component.
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * The description for a card, to be used within a `CardHeader`.
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - The props for the component.
 * @param {React.Ref<HTMLParagraphElement>} ref - The ref for the component.
 * @returns {JSX.Element} The card description component.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * The main content area of a card.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - The ref for the component.
 * @returns {JSX.Element} The card content component.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * The footer section of a card.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - The ref for the component.
 * @returns {JSX.Element} The card footer component.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
