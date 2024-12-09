import React from 'react';
import { TextField } from '@mui/material';

type InputTextProps = {
    id: string,
    type: string,
    label: string,
    required?: boolean,
    value: string,
    onChange: (val: string) => void,
}

export default function InputText({ id, type, label, required=false, value, onChange, ...props }: InputTextProps) {
  return (
    <TextField
        id={id}
        type={type}
        fullWidth
        variant="filled"
        margin="normal"
        label={label}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        required={required}
        { ...props }
    />
  )
}
