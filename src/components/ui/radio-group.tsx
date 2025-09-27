"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A set of checkable buttons, known as radio buttons, where no more than one can be checked at a time.
 * This is the root container for the radio group.
 *
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof RadioGroupPrimitive.Root>>} ref - The ref for the component.
 * @returns {JSX.Element} The radio group component.
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

/**
 * An item within a radio group that can be checked.
 *
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof RadioGroupPrimitive.Item>>} ref - The ref for the component.
 * @returns {JSX.Element} The radio group item component.
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
