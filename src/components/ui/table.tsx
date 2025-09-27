import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The root `<table>` component, wrapped in a div for overflow handling.
 * @param {React.HTMLAttributes<HTMLTableElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableElement>} ref - The ref for the component.
 * @returns {JSX.Element} The table component.
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

/**
 * The `<thead>` element for a table.
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableSectionElement>} ref - The ref for the component.
 * @returns {JSX.Element} The table header component.
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

/**
 * The `<tbody>` element for a table.
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableSectionElement>} ref - The ref for the component.
 * @returns {JSX.Element} The table body component.
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

/**
 * The `<tfoot>` element for a table.
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableSectionElement>} ref - The ref for the component.
 * @returns {JSX.Element} The table footer component.
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

/**
 * The `<tr>` element for a table.
 * @param {React.HTMLAttributes<HTMLTableRowElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableRowElement>} ref - The ref for the component.
 * @returns {JSX.Element} The table row component.
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

/**
 * The `<th>` element for a table header.
 * @param {React.ThHTMLAttributes<HTMLTableCellElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableCellElement>} ref - The ref for the component.
 * @returns {JSX.Element} The table head component.
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

/**
 * The `<td>` element for a table.
 * @param {React.TdHTMLAttributes<HTMLTableCellElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableCellElement>} ref - The ref for the component.
 * @returns {JSX.Element} The table cell component.
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

/**
 * The `<caption>` element for a table.
 * @param {React.HTMLAttributes<HTMLTableCaptionElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableCaptionElement>} ref - The ref for the component.
 * @returns {JSX.Element} The table caption component.
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
