import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Defines the visual styles for the Alert component variants.
 * This uses `class-variance-authority` to create different styles for `default` and `destructive` alerts.
 */
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * A component that displays a short, important message in a way that attracts the user's attention without interrupting their task.
 *
 * @param {React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - The ref for the component.
 * @returns {JSX.Element} The alert component.
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

/**
 * The title for the Alert component. Should be used as a child of `Alert`.
 *
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - The props for the component.
 * @param {React.Ref<HTMLParagraphElement>} ref - The ref for the component.
 * @returns {JSX.Element} The alert title component.
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/**
 * The description for the Alert component. Should be used as a child of `Alert`.
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - The props for the component.
 * @param {React.Ref<HTMLParagraphElement>} ref - The ref for the component.
 * @returns {JSX.Element} The alert description component.
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
