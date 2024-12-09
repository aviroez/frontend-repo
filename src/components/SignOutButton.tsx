'use client';

import React from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { firebaseAuth } from '@/lib/firebaseConfig';
import { clearUser } from '@/store/reducers';
import { MenuItem, Typography } from '@mui/material';

const SignOutButton = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(firebaseAuth);
            dispatch(clearUser());
            router.push('/');
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    return <MenuItem href="/" onClick={handleSignOut}>
        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
    </MenuItem>;
};

export default SignOutButton;
