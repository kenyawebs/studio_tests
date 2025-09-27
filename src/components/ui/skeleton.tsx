import { cn } from "@/lib/utils"

/**
 * A component to display a placeholder preview of a UI element before the data is loaded.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The skeleton loader component.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
