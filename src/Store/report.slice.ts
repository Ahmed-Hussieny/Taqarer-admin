import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { Report } from "../Interfaces/report";
export const handleGetAllReports = createAsyncThunk("report/handleGetAllReports", async ({
    page,
    name = "",
    source = "",
    year = "",
    custom = ""
}: { page: number, name?: string, source?: string, year?: string, custom?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/GetALLReports?page=${page}&custom=${custom}&name=${name}&source=${source}&year=${year}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleAddReport = createAsyncThunk("report/handleAddReport", async (apiData:FormData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/report/addSingleReport`,apiData);
        console.log( response.data);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleAddReports = createAsyncThunk("report/handleAddReports", async (apiData:FormData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/report/addReportsFromExcel`,apiData);
        console.log( response.data);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

const reportSlice = createSlice({
    name: "report",
    initialState: {
        reports: [] as Report[],
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
        builder.addCase(handleGetAllReports.fulfilled, (state, action) => {
            state.loading = false;
            
            if(!action.payload.reports.isFilled){
                const temp = state.reports;
                const newReports = action.payload.reports.data;
    
                // Merge and keep only unique reports based on their `id`
                state.reports = temp.concat(newReports.filter((newReport:Report) =>
                    !temp.some(existingReport => existingReport._id === newReport._id)
                ));
            }
            else{
                state.reports = action.payload.reports.data;
            }
            

            // state.reports = action.payload.reports.data;
            state.numberOfPages = action.payload.reports.numberOfPages;
            state.nameFilters = action.payload.reports.filterData.names;
            state.sourceFilters = action.payload.reports.filterData.sources;
            state.yearFilters = action.payload.reports.filterData.years;
            console.log(state.sourceFilters)
        });
        builder.addCase(handleGetAllReports.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleAddReport.fulfilled, (state, action) => {
            state.loading = false;
            state.reports.push(action.payload.report);
        });
        builder.addCase(handleAddReport.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleAddReports.fulfilled, (state, action) => {
            state.loading = false;
            state.reports = action.payload.reports;
        });
        builder.addCase(handleAddReports.rejected, (state) => {
            state.loading = false;
        });

    },
});

export default reportSlice.reducer;