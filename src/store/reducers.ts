import { User } from '@/apis/user';
import { updateUser } from '@/apis/userApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            const newUser = action.payload;

             // update user to api / firestore only if any changed
            if (
                !state.user || !state.user.name ||
                Object.keys(newUser).some(
                  (key) => state.user?.[key as keyof User] !== newUser[key as keyof User]
                )
            ) {
                updateUser(newUser);
            }
            state.user = newUser;
        },
        clearUser(state) {
          state.user = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
          state.loading = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
