"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * An image element with a fallback for representing a user or entity.
 * This is the root container for the avatar.
 *
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AvatarPrimitive.Root>>} ref - The ref for the component.
 * @returns {JSX.Element} The avatar root component.
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * The image to be displayed within the avatar.
 *
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AvatarPrimitive.Image>>} ref - The ref for the component.
 * @returns {JSX.Element} The avatar image component.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * A fallback that is rendered when the avatar image fails to load.
 * Typically used to display initials.
 *
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AvatarPrimitive.Fallback>>} ref - The ref for the component.
 * @returns {JSX.Element} The avatar fallback component.
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
