
"use client";

import React from 'react';
import { Input } from '@/components/ui/input';

interface LocationInputProps {
    id: string;
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    // The `types` prop is no longer needed with a basic input
}

export function LocationInput({ id, value, onValueChange, placeholder }: LocationInputProps) {
    // With OpenStreetMap, we don't have a direct "Autocomplete" component like Google Maps.
    // A full implementation would require integrating a geocoding service like Nominatim
    // and building a custom autocomplete dropdown.
    // For now, we will use a standard text input, which is a common approach.
    return (
        <Input
            id={id}
            type="text"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={placeholder}
        />
    );
}
