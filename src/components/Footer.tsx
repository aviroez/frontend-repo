import React from 'react'
import { Box, Typography } from '@mui/material';

export default function Footer() {
    return (
        <footer>
            <Box
                sx={{
                    height: '64px',
                    backgroundColor: 'primary.dark',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6">Developed by &copy; <a href="https://aviroez.com" target="_blank">aviroez.com</a></Typography>
            </Box>
        </footer>
    )
}
