'use client';
import { Alert, Typography } from '@mui/material';
import React, { useEffect } from 'react'

type AlertProp = {
    type: 'warning' | 'success' | 'info' | 'error',
    message: string,
    setMessage: (val: string) => void
}

export default function AlertDialog({type, message, setMessage}: AlertProp) {

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 5000); // Clear alert after 5 seconds
            return () => clearTimeout(timer); // Cleanup timeout if component unmounts
        }
    }, [message, setMessage]);

    return (
        <>
            {message && <Alert severity={type} onClose={() => setMessage('')}>
                <Typography>{message}</Typography>
            </Alert>}
        </>
    )
}
