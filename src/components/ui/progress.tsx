"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/**
 * A component to display an indicator showing the completion progress of a task.
 * This component is a styled wrapper around the Radix UI Progress primitive.
 *
 * @param {React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>} props - The props for the component, including a `value` from 0 to 100.
 * @param {React.Ref<React.ElementRef<typeof ProgressPrimitive.Root>>} ref - The ref for the component.
 * @returns {JSX.Element} The progress bar component.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
