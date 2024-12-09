'use client';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import { User } from "@/apis/user"; // use from turborepo instead
import { User } from "@buddy-turborepo/shared";
import { fetchUsers } from '@/apis/userApi';

export default function TableUsers() {
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        const fetchedUsers = async () => {
            try {
                const response = await fetchUsers();
                setUsers(response.data || []);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchedUsers(); 
    }, [])

    return (
        <TableContainer component={TableContainer} sx={{ overflowX: 'auto', marginBottom: 2, minHeight: 250 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">Salary</TableCell>
                        <TableCell align="center">Joined Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user) => (
                    <TableRow
                    key={user.uid}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell align="right">{user.age}</TableCell>
                        <TableCell align="right">{user.salary}</TableCell>
                        <TableCell>{user.joinedDate ? user.joinedDate.split('T')[0] : ''}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
