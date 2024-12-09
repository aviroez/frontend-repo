'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TableUsers from "@/components/TableUsers";
import { Button, Card, CircularProgress, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebaseConfig";
import { clearUser, setUser } from "@/store/reducers";

export default function Home() {
    const { user, loading } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                dispatch(setUser({ uid: user.uid, email: user.email }));
            } else {
                dispatch(clearUser());
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

  return (
    <Card sx={{margin: 4, padding: 2, borderRadius: 4}}>
        <Typography variant="h3" gutterBottom>EBUDDY PTE. LTD. Technical Test</Typography>
        {loading ? <CircularProgress color="success" /> : 
            (user ? <TableUsers /> : 
                <>
                    <Typography variant="body1" gutterBottom>You need to login to see the Data</Typography>
                    <Button variant="outlined" color="primary" href="/auth" sx={{marginTop: 4}}>Login Now</Button>
                </>
            )
        }
    </Card>
  );
}
