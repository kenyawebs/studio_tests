"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

/**
 * The main form provider component from `react-hook-form`.
 * All form components should be wrapped in this.
 */
const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

/**
 * A component that connects a form input to the form state.
 * It wraps the `Controller` component from `react-hook-form`.
 *
 * @param {ControllerProps<TFieldValues, TName>} props - The props for the component.
 * @returns {JSX.Element} The form field component.
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

/**
 * A hook to access the form field's state and context.
 * Must be used within a `<FormField />` component.
 * It provides accessibility props and error state.
 *
 * @returns {object} An object containing the field's state and IDs.
 */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

/**
 * A container for a form field, including its label, input, description, and error message.
 * It provides a unique ID to its children for accessibility.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - The ref for the component.
 * @returns {JSX.Element} The form item component.
 */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

/**
 * The label for a form field. It is automatically associated with the form control.
 *
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof LabelPrimitive.Root>>} ref - The ref for the component.
 * @returns {JSX.Element} The form label component.
 */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

/**
 * A wrapper for the form input control. It automatically adds accessibility attributes.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Slot>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof Slot>>} ref - The ref for the component.
 * @returns {JSX.Element} The form control component.
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

/**
 * A description for a form field, providing additional context or instructions.
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - The props for the component.
 * @param {React.Ref<HTMLParagraphElement>} ref - The ref for the component.
 * @returns {JSX.Element} The form description component.
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

/**
 * A component to display validation error messages for a form field.
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - The props for the component.
 * @param {React.Ref<HTMLParagraphElement>} ref - The ref for the component.
 * @returns {JSX.Element | null} The form message component, or null if there is no error.
 */
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
