"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A vertically stacked set of interactive headings that each reveal a section of content.
 * This component acts as the root container for the accordion items.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/accordion
 */
const Accordion = AccordionPrimitive.Root

/**
 * An item within the accordion, containing a trigger and content.
 *
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Item>>} ref - The ref for the component.
 * @returns {JSX.Element} The accordion item component.
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

/**
 * The button that toggles the accordion item's content open or closed.
 *
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Trigger>>} ref - The ref for the component.
 * @returns {JSX.Element} The accordion trigger component.
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/**
 * The collapsible content panel for an accordion item.
 *
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Content>>} ref - The ref for the component.
 * @returns {JSX.Element} The accordion content component.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
