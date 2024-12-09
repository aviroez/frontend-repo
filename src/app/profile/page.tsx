'use client';

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, CircularProgress, Typography } from "@mui/material";

import InputText from "@/components/InputText";
import { RootState } from '@/store/store';
import { setUser, setLoading } from '@/store/reducers';
import { fetchUserById } from "@/apis/userApi";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { User } from "@/apis/user";
import AlertDialog from "@/components/AlertDialog";

export default function Profile() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [salary, setSalary] = useState('');
    const [joinedDate, setJoinedDate] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);

    const fetchedUser = async (uid: string) => {
        try {
            const response = await fetchUserById(uid);
            const userData = response.data;
            if (userData) {
                setName(userData.name);
                setEmail(userData.email);
                setAge(userData.age || '');
                setSalary(userData.salary || '');
                if (userData.joinedDate) {
                    setJoinedDate(userData.joinedDate.split("T")[0]);
                }
                dispatch(setUser(userData));
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message || 'An unexpected error occurred.');
            } else {
                setMessage('An unknown error occurred.');
            }
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                fetchedUser(user?.uid);
            } else {
                router.push('/auth');
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));

        try {
            const profileUser: User = {email, name, age: parseInt(age), salary: parseInt(salary)};
            if (joinedDate) {
                profileUser.joinedDate = new Date(joinedDate).toISOString();
            }
            dispatch(setUser(profileUser));
            setMessage('Data Updated Successfully');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message || 'An unexpected error occurred.');
            } else {
                setMessage('An unknown error occurred.');
            }
            console.error('update failed:', error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <Card sx={{margin: 4, padding: 2, borderRadius: 4}}>
            <AlertDialog type="warning" message={message} setMessage={setMessage} />
            <Typography variant="h4" gutterBottom align="center">Your Profile</Typography>
            {loading ? <CircularProgress color="success" /> : 
            <form onSubmit={onSubmit}>
                <InputText
                    id="text-name"
                    type="text"
                    label="Name"
                    required={true}
                    value={name}
                    onChange={setName}
                />
                <InputText
                    id="text-email"
                    type="email"
                    label="Email"
                    required={true}
                    value={email}
                    onChange={setEmail}
                />
                <InputText
                    id="text-age"
                    type="text"
                    label="Age"
                    value={age}
                    onChange={setAge}
                />
                <InputText
                    id="text-salary"
                    type="text"
                    label="Salary"
                    value={salary}
                    onChange={setSalary}
                />
                <InputText
                    id="text-joined-date"
                    type="date"
                    label="Joined Date"
                    value={joinedDate}
                    onChange={setJoinedDate}
                />
                <Button type="submit" variant="outlined" color="primary">Update</Button>
            </form>}
        </Card>
    )
}
