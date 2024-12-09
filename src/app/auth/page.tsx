'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, CircularProgress, Divider, Typography } from "@mui/material";

import InputText from "@/components/InputText";
import { RootState } from '@/store/store';
import { setUser, setLoading } from '@/store/reducers';
import { firebaseAuth } from '@/lib/firebaseConfig';
import { fetchUserById } from "@/apis/userApi";
import { grey } from "@mui/material/colors";
import AlertDialog from "@/components/AlertDialog";
import { FirebaseError } from "firebase/app";

export default function LoginAuth() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);
    const [type, setType] = useState<'warning' | 'success' | 'info' | 'error'>('info');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const { user, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user && !loading) {
            router.push('/');
        }
    }, [user, loading])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (register) {
            handleRegister(email, password);
        } else {
            handleLogin(email, password);
        }
    }

    const handleRegister = async (email: string, password: string) => {
        dispatch(setLoading(true));
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const { uid, email: userEmail } = userCredential.user;
            dispatch(setUser({ uid, name, email: userEmail }));
        } catch (error: unknown) {
            alertError(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleLogin = async (email: string, password: string) => {
        dispatch(setLoading(true));
        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            const { uid, email: loggedInEmail } = userCredential.user;
            const userData = await fetchUserById(uid);
            if (userData.data) {
                dispatch(setUser(userData));
            } else {
                dispatch(setUser({ uid, email: loggedInEmail }));
            }
        } catch (error: unknown) {
            alertError(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    const alertError = (error: unknown) => {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setType('warning');
                    setMessage('User is already registered');
                    break;
                case 'auth/user-not-found':
                    setType('warning');
                    setMessage('User not found');
                    break;
                case 'auth/wrong-password':
                    setType('warning');
                    setMessage('Wrong password');
                    break;
                default: 
                    setType('warning');
                    setMessage(error.message);
                break;
            }
            setMessage(error.message || 'An unexpected error occurred.');
        } else {
            setMessage('An unknown error occurred.');
        }
    }

    return (
        <Card sx={{padding: 4, margin: 4, borderRadius: 4}}>
            <Typography variant="h4" gutterBottom align="center">{register ? 'Register Now' : 'Login Now'}</Typography>

            <AlertDialog type={type} message={message} setMessage={setMessage} />

            {loading ? <CircularProgress color="success" /> : 
            <form onSubmit={onSubmit}>
                {register && 
                <InputText
                    id="text-name"
                    type="text"
                    label="Name"
                    required={true}
                    value={name}
                    onChange={setName}
                />
                }
                <InputText
                    id="text-email"
                    type="email"
                    label="Email"
                    value={email}
                    required={true}
                    onChange={setEmail}
                />
                <InputText
                    id="text-password"
                    type="password"
                    label="Password"
                    value={password}
                    required={true}
                    onChange={setPassword}
                />
                {register ? <>
                    <Button type="submit" variant="contained" color="primary">Register</Button>
                    <Divider orientation="vertical" variant="middle" sx={{color: grey[800]}} >Already have an account?</Divider>

                    <Button variant="outlined" color="warning" onClick={() => setRegister(false)}>Login</Button>
                </> : <>
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                    <Divider orientation="vertical" variant="middle" sx={{color: grey[800]}}  >Dont have an account?</Divider>
                    <Button variant="outlined" color="warning" onClick={() => setRegister(true)}>Register</Button>
                </>}
            </form>}
        </Card>
    )
}
