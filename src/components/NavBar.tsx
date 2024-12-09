'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SignOutButton from '@/components/SignOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebaseConfig';

function NavBar() {
    const { user } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {

            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <header>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Test Next JS
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                // sx={{ display: { xs: 'block', md: 'none' } }}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    width: '100vw', // Full viewport width
                                }}
                            >
                                    <MenuItem href="/" onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>Home</Typography>
                                    </MenuItem>
                                    {user ? <SignOutButton /> : <MenuItem href="/auth" onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>Login</Typography>
                                    </MenuItem>}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            Test Next JS
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                href='/'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button>
                            {user ? <>
                                <Button
                                    href='/profile'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Profile
                                </Button>
                                <SignOutButton />
                            </> : <Button
                                href='/auth'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Login
                            </Button>}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
    );
}
export default NavBar;
