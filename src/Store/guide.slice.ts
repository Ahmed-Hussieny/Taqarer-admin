import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { Guide } from "../Interfaces/guide";
export const handleGetAllGuides = createAsyncThunk("guide/handleGetAllGuides", async ({
    page,
    name = "",
    source = "",
    year = "",
    custom = ""
}: { page: number, name?: string, source?: string, year?: string, custom?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/guide/GetALLGuides?page=${page}&custom=${custom}&name=${name}&source=${source}&year=${year}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

const guideSlice = createSlice({
    name: "guide",
    initialState: {
        guides: [] as Guide[],
        nameFilters: [] as string[],
        sourceFilters: [] as string[],
        yearFilters: [] as string[],
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
        builder.addCase(handleGetAllGuides.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload.guides.data)
            
            if(!action.payload.guides.isFilled){
                const temp = state.guides;
                const newguides = action.payload.guides.data;
    
                state.guides = temp.concat(newguides.filter((newReport:Guide) =>
                    !temp.some(existingReport => existingReport._id === newReport._id)
                ));
            }
            else{
                state.guides = action.payload.guides.data;
            }
            
            state.numberOfPages = action.payload.guides.numberOfPages;
            state.nameFilters = action.payload.guides.filterData.names;
            state.sourceFilters = action.payload.guides.filterData.sources;
            state.yearFilters = action.payload.guides.filterData.years;
            console.log(state.sourceFilters)
        });
        builder.addCase(handleGetAllGuides.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default guideSlice.reducer;