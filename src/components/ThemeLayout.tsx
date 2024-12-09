'use client';

import theme from '@/theme'
import { ThemeProvider } from '@emotion/react'
import React from 'react'

export default function ThemeLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
