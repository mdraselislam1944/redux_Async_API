import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import auth from "../../../../Firebase/firebase.config";

const initialState = {
    name: "",
    email: "",
    isLoading: false,
    isError: false,
    error: '',
};

export const createUser = createAsyncThunk(
    'userSlice/createUser',
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const data = await createUserWithEmailAndPassword(auth, email, password);
            const user = data.user;

            await updateProfile(user, {
                displayName: name,
            });

            return {
                email: user.email,
                name: name,
            };
        } catch (error) {
            console.error("error message is: ", error.message);
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'userSlice/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("error message is: ", error.message);
            return rejectWithValue(error.message);
        }
    }
);

export const loggedUser = createAsyncThunk('userSlice/loggedUser', async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await signInWithEmailAndPassword(auth, email, password);
            return {
                email: data.user.email,
                name: data.user.displayName
            };
        } catch (error) {
            console.error('Error loggedIn user:', error.message);
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.name = payload.name;
            state.email = payload.email;
        },
        toggleLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.email = "";
                state.name = "";
                state.error = "";
            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.email = payload.email;
                state.name = payload.name;
                state.error = "";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.email = "";
                state.name = "";
                state.error = action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.email = "";
                state.name = "";
                state.error = "";
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(loggedUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.email = "";
                state.name = "";
                state.error = "";
            })
            .addCase(loggedUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.email = payload.email;
                state.name = payload.name;
                state.error = "";
            })
            .addCase(loggedUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            });
    },
});

export const { setUser, toggleLoading } = userSlice.actions;

export default userSlice.reducer;
