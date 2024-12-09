import * as React from 'react';
import Button from '@mui/material/Button';

type UpdatedButtonProps = {
    value: string,
    href: string
}

export default function UpdatedButton({value, href}: UpdatedButtonProps) {
  return <Button variant="contained" href={href}>{value}</Button>;
}