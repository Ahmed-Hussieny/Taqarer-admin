import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { LoginFormValues, RegisterFormValues } from "../Interfaces/auth";
import { ApiErrorResponse } from "../Interfaces/error";

export const handleLogin = createAsyncThunk("auth/handleLogin", async (data: LoginFormValues) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signin`, data);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleRegister = createAsyncThunk("auth/handleRegister", async (data: RegisterFormValues) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, data);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandelVerifyEmail = createAsyncThunk("auth/HandelVerifyEmail", async (token: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/verifyEmail?userToken=${token}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandelresendVerificationEmail = createAsyncThunk("auth/HandelresendVerificationEmail", async (token: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/resendVerificationEmail`, { token });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandelForgotPassword = createAsyncThunk("auth/HandelForgotPassword", async (email: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/forgotPassword`, { email });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandelResetPassword = createAsyncThunk("auth/HandelResetPassword", async ({ token, newPassword }: { token: string, newPassword: string }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/resetPassword`, { token, newPassword });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandelVerifyResetCode = createAsyncThunk("auth/HandelVerifyResetCode", async ({ token }: { token: string}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/verifyResetToken?token=${token}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandleUpdateLoggedInUser = createAsyncThunk("auth/HandleUpdateLoggedInUser", async (data: {username:string, email:string}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/auth/updateLoggedInUser`, data,{
            headers:{
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const HandleUpdateLoggedInPassword = createAsyncThunk("auth/HandleUpdateLoggedInPassword", async (data: {oldPassword:string, newPassword:string}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/auth/updateLoggedInUserPassword`, data,{
            headers:{
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

//^ getAllClientUsers
export const HandleGetAllClientUsers = createAsyncThunk("auth/HandleGetAllClientUsers", async ({
    page,
    email
}:{
    page?: number,
    email?: string
}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/client-user/getAllClientUsers?page=${page}&email=${email}`,{
            headers:{
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

//^ toggleUserVerification
export const HandleToggleVerification = createAsyncThunk("auth/HandleToggleVerification", async (id: string) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/client-user/toggleUserVerification/${id}`, null,{
            headers:{
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    }
    catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    }
});
interface Package {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    createdAt: string;
}
interface ClientUser {
    _id: string;
    username: string;
    email: string;
    endDate: string;
    isVerified: boolean;
    subscribed: boolean;
    startDate:string;
    packageId: Package;
    createdAt: string;
}
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
        clientUsers:[] as ClientUser[],
        loading: false,
        error: null,
        currentPath : "",
        activeNumber: 1
    },
    reducers: {
        changeCurrentPath(state, action) {
            state.loading = true;
            state.currentPath = action.payload; 
        },
        changeActiveNav(state, action) {
            state.activeNumber = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(handleLogin.rejected, (state) => {
            state.loading = false;
        });

        //^ handleRegister
        builder.addCase(handleRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(handleRegister.rejected, (state) => {
            state.loading = false;
        });

        //^ HandelVerifyEmail
        builder.addCase(HandelVerifyEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandelVerifyEmail.rejected, (state) => {
            state.loading = false;
        });

        //^ HandelresendVerificationEmail
        builder.addCase(HandelresendVerificationEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandelresendVerificationEmail.rejected, (state) => {
            state.loading = false
        });

        //^ HandelForgotPassword
        builder.addCase(HandelForgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandelForgotPassword.rejected, (state) => {
            state.loading = false;
        });

        //^ HandelResetPassword
        builder.addCase(HandelResetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandelResetPassword.rejected, (state) => {
            state.loading = false;
        });

        //^ HandelVerifyResetCode
        builder.addCase(HandelVerifyResetCode.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandelVerifyResetCode.rejected, (state) => {
            state.loading = false;
        });

        //^ HandleUpdateLoggedInUser
        builder.addCase(HandleUpdateLoggedInUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandleUpdateLoggedInUser.rejected, (state) => {
            state.loading = false;
        });

        //^ HandleUpdateLoggedInPassword
        builder.addCase(HandleUpdateLoggedInPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.userData;
        });
        builder.addCase(HandleUpdateLoggedInPassword.rejected, (state) => {
            state.loading = false;
        });

        //^ HandleGetAllClientUsers
        builder.addCase(HandleGetAllClientUsers.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload.users)
            state.clientUsers = action.payload.users;
        });
        builder.addCase(HandleGetAllClientUsers.rejected, (state) => {
            state.loading = false;
        });

        //^ HandleToggleVerification
        builder.addCase(HandleToggleVerification.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload.user)
            state.clientUsers = state.clientUsers.map(user => {
                if(user._id === action.payload.user._id){
                    return action.payload.user
                }
                return user
            })
        });
        builder.addCase(HandleToggleVerification.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default userSlice.reducer;
export const { changeCurrentPath, changeActiveNav } = userSlice.actions;