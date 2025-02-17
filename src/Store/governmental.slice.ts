import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { IGovernmental } from "../Interfaces/governmental";

export const handleGetAllGovernmentals = createAsyncThunk("governmental/handleGetAllGovernmentals", async ({
    page,
    name = "",
    classification = ""
}: { page: number, name?: string, classification?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/governmental/GetALLGovernmentals?page=${page}&classification=${classification}&name=${name}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleAddGovernmental = createAsyncThunk("governmental/handleAddGovernmental", async (apiData: FormData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/governmental/addSingleGovernmental`, apiData,{
            headers:{
                accesstoken: `Bearer_${localStorage.getItem("userToken")}`,
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleDeleteGovernmental = createAsyncThunk("governmental/handleDeleteGovernmental", async (id: string) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/governmental/deleteGovernmental/${id}`,{
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

export const handleAddGovernmentals = createAsyncThunk("governmental/handleAddGovernmentals", async (apiData: FormData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/governmental/addGovernmentalsFromExcel`, apiData,{
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

export const handleUpdateGovernmental = createAsyncThunk("governmental/handleUpdateGovernmental", async ({id,apiData}:{
    id: string,apiData: {
        name: string,
        link: string,
        classification: string,
        description: string
    }}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/governmental/updateGovernmental/${id}`,apiData,{
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

export const handleGetGovernmental = createAsyncThunk("guide/handleGetGovernmental", async (id: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/governmental/getGovernmental/${id}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

const guideSlice = createSlice({
    name: "governmental",
    initialState: {
        governmentals: [] as IGovernmental[],
        classifications: [] as string[],
        numberOfPages: 0,
        loading: false,
        error: null,
    },
    reducers: {
        getClincsRequest(state) {
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(handleGetAllGovernmentals.fulfilled, (state, action) => {
            state.loading = false;
            state.governmentals = action.payload.governmentals;
            state.classifications = action.payload.filterData.classifications;
            state.numberOfPages = action.payload.numberOfPages;
        });
        builder.addCase(handleGetAllGovernmentals.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleDeleteGovernmental.fulfilled, (state, action) => {
            state.loading = false;
            state.governmentals = state.governmentals.filter(governmental => governmental._id !== action.payload.governmental._id);
        });
        builder.addCase(handleDeleteGovernmental.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleAddGovernmental.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleAddGovernmental.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleAddGovernmentals.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleAddGovernmentals.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleUpdateGovernmental.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleUpdateGovernmental.rejected, (state) => {
            state.loading = false
        });

        builder.addCase(handleGetGovernmental.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleGetGovernmental.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default guideSlice.reducer;