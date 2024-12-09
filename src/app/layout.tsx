import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";
import ThemeLayout from "@/components/ThemeLayout";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "EBUDDY PTE. LTD. Technical Test",
    description: "Developed by Aviroez",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <ThemeLayout>
                    <Providers>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                            <NavBar />

                            <Box
                                sx={{
                                    flex: 1,
                                    backgroundColor: 'grey.100',
                                    padding: '16px',
                                    overflowY: 'auto',
                                }}
                            >
                                {children}
                            </Box>

                            <Footer />
                        </Box>
                    </Providers>
                </ThemeLayout>
            </body>
        </html>
    );
}
