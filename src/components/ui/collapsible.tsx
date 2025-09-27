"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * An interactive component which expands/collapses a content section.
 * This is the root component.
 * @see https://www.radix-ui.com/primitives/docs/components/collapsible
 */
const Collapsible = CollapsiblePrimitive.Root

/**
 * The button that toggles the collapsible content open or closed.
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

/**
 * The content that is shown or hidden by the collapsible trigger.
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
