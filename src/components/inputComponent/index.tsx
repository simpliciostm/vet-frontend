import { TextField } from '@mui/material';
import react from 'react';

interface textFieldProps {
    type: string;
    label: string;
    onChange: (e: string) => void;
}

export const TextFieldInputComponent = (props: textFieldProps) => {
    
    return(
        <TextField size='small' label={props.label} onChange={(e) => props.onChange(e.target.value)} />
    )
}