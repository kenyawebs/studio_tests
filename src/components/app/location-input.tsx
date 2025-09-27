
"use client";

import React from 'react';
import { Input } from '@/components/ui/input';

interface LocationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange: (value: string) => void;
}

/**
 * Renders a simple text input for location entry.
 *
 * This component serves as a basic location input field. It is designed to be
 * a placeholder for a more advanced implementation that would typically include
 * an autocomplete feature using a geocoding service (like OpenStreetMap's
 * Nominatim). Currently, it functions as a standard, controlled text input.
 *
 * @param {LocationInputProps} props - The props for the component, including standard input attributes.
 * @param {string | number | readonly string[] | undefined} props.value - The current value of the input.
 * @param {(value: string) => void} props.onValueChange - Callback function to handle value changes.
 * @returns {JSX.Element} The location input component.
 */
export function LocationInput({ value, onValueChange, ...props }: LocationInputProps) {
    // With OpenStreetMap, we don't have a direct "Autocomplete" component like Google Maps.
    // A full implementation would require integrating a geocoding service like Nominatim
    // and building a custom autocomplete dropdown.
    // For now, we will use a standard text input, which is a common approach.
    return (
        <Input
            type="text"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            {...props}
        />
    );
}
