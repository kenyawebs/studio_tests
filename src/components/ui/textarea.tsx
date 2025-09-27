
import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * Renders a styled multi-line text input field.
 * This component forwards its ref to the underlying `textarea` element.
 *
 * @param {React.ComponentProps<'textarea'>} props - The props for the component, extending standard textarea attributes.
 * @param {React.Ref<HTMLTextAreaElement>} ref - The ref for the component.
 * @returns {JSX.Element} The textarea component.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
