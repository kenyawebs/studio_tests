"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * A set of layered sections of content, known as tab panels, that are displayed one at a time.
 * This is the root component for the tabs.
 * @see https://www.radix-ui.com/primitives/docs/components/tabs
 */
const Tabs = TabsPrimitive.Root

/**
 * A list of tab triggers that are used to switch between tab content.
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof TabsPrimitive.List>>} ref - The ref for the component.
 * @returns {JSX.Element} The tabs list component.
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * The button that activates its associated tab content.
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof TabsPrimitive.Trigger>>} ref - The ref for the component.
 * @returns {JSX.Element} The tabs trigger component.
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * The content panel that is displayed when its associated tab is activated.
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof TabsPrimitive.Content>>} ref - The ref for the component.
 * @returns {JSX.Element} The tabs content component.
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
