import { User } from "@/apis/user";
import { firebaseAuth } from '@/lib/firebaseConfig';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLICT_BACKEND_API_URL || 'http://localhost:3500';

export const fetchUsers = async () => {
    try {
        const token = await firebaseAuth.currentUser?.getIdToken()
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchUserById = async (uid: string) => {
    try {
        const token = await firebaseAuth.currentUser?.getIdToken()
        const response = await fetch(`${API_URL}/users/${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (userData: User) => {
    try {
        const token = await firebaseAuth.currentUser?.getIdToken()
        const response = await fetch(`${API_URL}/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData),
        });
    
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
    
        return await response.json();
    } catch (error) {
        throw error;
    }
};
  