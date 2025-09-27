"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * The provider that supplies context to all tooltips.
 * It should be rendered at the root of the application.
 */
const TooltipProvider = TooltipPrimitive.Provider

/**
 * The root component for a tooltip.
 * @see https://www.radix-ui.com/primitives/docs/components/tooltip
 */
const Tooltip = TooltipPrimitive.Root

/**
 * The trigger that opens the tooltip when hovered or focused.
 */
const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * The content that is displayed within the tooltip.
 * @param {React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof TooltipPrimitive.Content>>} ref - The ref for the component.
 * @returns {JSX.Element} The tooltip content component.
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
