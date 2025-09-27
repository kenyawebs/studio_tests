"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

/**
 * The root component for an alert dialog that interrupts the user with important content and expects a response.
 * @see https://www.radix-ui.com/primitives/docs/components/alert-dialog
 */
const AlertDialog = AlertDialogPrimitive.Root

/**
 * The button that opens the alert dialog.
 */
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

/**
 * A portal that renders its children into a new element appended to `document.body`.
 * Used to display the dialog outside of the main application flow.
 */
const AlertDialogPortal = AlertDialogPrimitive.Portal

/**
 * A semi-transparent overlay that is rendered behind the dialog.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Overlay>>} ref - The ref for the component.
 * @returns {JSX.Element} The alert dialog overlay component.
 */
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

/**
 * The main content of the alert dialog.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Content>>} ref - The ref for the component.
 * @returns {JSX.Element} The alert dialog content component.
 */
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

/**
 * A container for the alert dialog's title and description.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The alert dialog header component.
 */
const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

/**
 * A container for the alert dialog's action and cancel buttons.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The alert dialog footer component.
 */
const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

/**
 * The title of the alert dialog.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Title>>} ref - The ref for the component.
 * @returns {JSX.Element} The alert dialog title component.
 */
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

/**
 * The description of the alert dialog.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Description>>} ref - The ref for the component.
 * @returns {JSX.Element} The alert dialog description component.
 */
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

/**
 * The button that confirms the action in the alert dialog.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Action>>} ref - The ref for the component.
 * @returns {JSX.Element} The alert dialog action button component.
 */
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

/**
 * The button that cancels the action and closes the alert dialog.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Cancel>>} ref - The ref for the component.
 * @returns {JSX.Element} The alert dialog cancel button component.
 */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
