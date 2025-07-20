
"use client";

import React from 'react';
import { Input } from '@/components/ui/input';

interface LocationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange: (value: string) => void;
}

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
