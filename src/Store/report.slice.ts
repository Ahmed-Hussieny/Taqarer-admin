import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { Report } from "../Interfaces/report";

export const handleGetAllReports = createAsyncThunk("report/handleGetAllReports", async ({
    page,
    classification = "",
    source = "",
    year = "",
    custom = ""
}: { page: number, classification?: string, source?: string, year?: string, custom?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/GetALLReports?page=${page}&custom=${custom}&classification=${classification}&source=${source}&year=${year}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleGetReport = createAsyncThunk("report/handleGetReport", async (id: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getReport/${id}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleAddReport = createAsyncThunk("report/handleAddReport", async (apiData:FormData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/report/addSingleReport`,apiData,{
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

export const handleUpdateReport = createAsyncThunk("report/handleUpdateReport", async ({id,apiData}:{
    id: string,apiData: FormData}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/report/updateReport/${id}`,apiData,{
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


export const handleAddReports = createAsyncThunk("report/handleAddReports", async (apiData:FormData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/report/addReportsFromExcel`,apiData,{
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

export const handleDeleteReport = createAsyncThunk("report/handleDeleteReport", async (id: string) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/report/deleteReport/${id}`,{
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

export const handelDownloadReport = createAsyncThunk(
    "report/handelDownloadReport",
    async (id: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/downloadReport/${id}`, {
          responseType: "blob", // Ensures we get binary data (PDF)
          headers: {
            accesstoken: `Bearer_${localStorage.getItem("userToken")}`
          },
        });
  
        // Create a Blob URL and trigger the download
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `report-${id}.pdf`); // Set filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Cleanup
  
        return { success: true };
      } catch (error) {
        const err = error as ApiErrorResponse;
        return rejectWithValue(err.response.data);
      }
    }
  );
  

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
            state.reports = action.payload.reports.data;
            state.numberOfPages = action.payload.reports.totalPages;
            state.nameFilters = action.payload.reports.filterData.classification;
            state.sourceFilters = action.payload.reports.filterData.sources;
            state.yearFilters = action.payload.reports.filterData.years;
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

        builder.addCase(handleDeleteReport.fulfilled, (state, action) => {
            state.loading = false;
            state.reports = state.reports.filter(report => report._id !== action.payload.report._id);
        });
        builder.addCase(handleDeleteReport.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handelDownloadReport.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handelDownloadReport.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleGetReport.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleGetReport.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleUpdateReport.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.reports.findIndex(report => report._id === action.payload.report._id);
            state.reports[index] = action.payload.report;
        });
        builder.addCase(handleUpdateReport.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default reportSlice.reducer;