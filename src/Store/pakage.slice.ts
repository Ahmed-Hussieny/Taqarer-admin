import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { Pakage } from "../Interfaces/pakage";

export const handleGetAllPayments = createAsyncThunk("report/handleGetAllPayments", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/payment-package/get-payments`,{
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleMakeStripePayment = createAsyncThunk("report/handleMakeStripePayment", async ({
    id
}:{
    id: string;
}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/client-user/make-stripe-payment/${id}`,null, {
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});


export const handleAddPackage = createAsyncThunk("report/handleAddPackage", async ({
    name,
    price,
    description,
    features,
    duration,
    maxNumberOfReports
}:{
    name: string;
    price: number;
    description: string;
    features: string[];
    duration: number;
    maxNumberOfReports: number;
}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/payment-package/add-payment`,{
            name,
            price,
            description,
            features,
            duration,
            maxNumberOfReports
        }, {
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleDeletePakage = createAsyncThunk("report/handleDeletePakage", async ({
    id
}:{
    id: string;
}) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/payment-package/delete-payment/${id}`, {
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleTogglePakage = createAsyncThunk("report/handleTogglePakage", async ({
    id
}:{
    id: string;
}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/payment-package/toggle-payment/${id}`,null, {
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleUpdatePakage = createAsyncThunk("report/handleUpdatePakage", async ({
    id,
    name,
    price,
    description,
    features,
    duration,
    maxNumberOfReports
}:{
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
    duration: number;
    maxNumberOfReports: number;
}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/payment-package/update-payment/${id}`,{
            name,
            price,
            description,
            features,
            duration,
            maxNumberOfReports
        }, {
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleGetPayment = createAsyncThunk("report/handleGetPayment", async ({
    id
}:{
    id: string;
}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/payment-package/get-payment/${id}`, {
            headers: {
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
}
);


const pakageSlice = createSlice({
    name: "pakage",
    initialState: {
        pakages: [] as Pakage[],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(handleGetAllPayments.fulfilled, (state, action) => {
            state.loading = false;
            state.pakages = action.payload.paymentPackages;
        });
        builder.addCase(handleGetAllPayments.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleMakeStripePayment.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleMakeStripePayment.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleAddPackage.fulfilled, (state, action) => {
            state.loading = false;
            state.pakages = [...state.pakages, action.payload.paymentPackage];
        });
        builder.addCase(handleAddPackage.rejected, (state) => {
            state.loading = false;
        });

        //^handleDeletePakage
        builder.addCase(handleDeletePakage.fulfilled, (state, action) => {
            state.loading = false;
            state.pakages = state.pakages.filter((pakage) => pakage?._id !== action.payload?.deletedPaymentPackage?._id);
        });
        builder.addCase(handleDeletePakage.rejected, (state) => {
            state.loading = false;
        });

        //^handleTogglePakage
        builder.addCase(handleTogglePakage.fulfilled, (state, action) => {
            state.loading = false;
            state.pakages = state.pakages.map((pakage) => {
                if (pakage._id === action.payload.paymentPackage._id) {
                    return action.payload.paymentPackage;
                }
                return pakage;
            });
        });
        builder.addCase(handleTogglePakage.rejected, (state) => {
            state.loading = false;
        });

        //^handleUpdatePakage
        builder.addCase(handleUpdatePakage.fulfilled, (state, action) => {
            state.loading = false;
            state.pakages = state.pakages.map((pakage) => {
                if (pakage._id === action.payload.updatedPaymentPackage._id) {
                    return action.payload.updatedPaymentPackage;
                }
                return pakage;
            });
        });
        builder.addCase(handleUpdatePakage.rejected, (state) => {
            state.loading = false;
        });

        //^handleGetPayment
        builder.addCase(handleGetPayment.fulfilled, (state, action) => {
            state.loading = false;
            state.pakages = [...state.pakages, action.payload.paymentPackage];
        });
        builder.addCase(handleGetPayment.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default pakageSlice.reducer;