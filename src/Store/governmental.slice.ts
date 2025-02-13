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
            state.classifications = action.payload.classifications
            ;
        });
        builder.addCase(handleGetAllGovernmentals.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default guideSlice.reducer;