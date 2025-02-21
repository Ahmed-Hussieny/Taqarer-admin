import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { Pakage } from "../Interfaces/pakage";

export const handleGetAllPayments = createAsyncThunk("report/handleGetAllPayments", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/payment-package/get-all`);
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
}
)
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
    },
});

export default pakageSlice.reducer;