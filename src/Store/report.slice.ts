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
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`
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
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`
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
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`
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
                accesstoken: `Bearer_${localStorage.getItem("authToken")}`
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
    async (id: string) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL_WS_RECONNECT}/uploads/Original_PDFs/Reports/${id}`, {
          headers: {
            accesstoken: `Bearer_${localStorage.getItem("authToken")}`
          },
        //   responseType: "blob", // Handles PDF downloads correctly
        });
  
        // Create a URL for the file and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `report-${id}.pdf`); // Set the filename
        document.body.appendChild(link);
        link.click();
        link.remove();
  
        return { success: true };
      } catch (error) {
        console.error("Error downloading report:", error);
        return { success: false, message: "Download failed" };
      }
    }
  );
  
  
  interface ClassificationI {
    classification: string;
    sources: string[];
    years: string[];
  };

  interface SourceI {
    classification: string[];
    source: string;
    years: string[];
  };

  interface YearI {
    classification: string[];
    source: string;
    years: string[];
  };

const reportSlice = createSlice({
    name: "report",
    initialState: {
        reports: [] as Report[],
        nameFilters: [] as string[],
        sourceFilters: [] as string[],
        yearFilters: [] as string[],
        originalNames: [] as string[],
        originalSources: [] as string[],
        originalYears: [] as string[],
        numberOfPages: 0,
        loading: false,
        classificationRelationships: [] as ClassificationI[],
        sourceRelationships: [] as SourceI[],
        yearRelationships: [] as YearI[],
        error: null,
    },
    reducers: {
        getClincsRequest(state) {
            state.loading = true;
        },
        classificationChange(state, action) {
            if(action.payload === "") {
                state.sourceFilters = state.originalSources;
                state.yearFilters = state.originalYears;
                return;
            }
            state.sourceFilters = state.classificationRelationships.find(
                c => c.classification === action.payload
            )?.sources || [];

            state.yearFilters = state.classificationRelationships.find(
                c => c.classification === action.payload
            )?.years || [];
        },
        
        sourceChange(state, action) {
            if (action.payload === "") {
                state.yearFilters = state.originalYears;
                return;
            }
        
            // const filteredClassifications = state.classificationRelationships.filter(
            //     c => c.sources.includes(action.payload)
            // );
        
            // state.yearFilters = [...new Set(filteredClassifications.flatMap(c => c.years))];
        
            // // Ensure classification is updated accordingly
            // state.nameFilters = [...new Set(filteredClassifications.map(c => c.classification))];
            // state.reports = state.reports.filter(report => report.source === action.payload);
        },
        
        yearChange(state, action) {
            if (action.payload === "") {
                state.sourceFilters = state.originalSources;
                return;
            }
        
            // const filteredClassifications = state.classificationRelationships.filter(
            //     c => c.years.includes(action.payload)
            // );
        
            // state.sourceFilters = [...new Set(filteredClassifications.flatMap(c => c.sources))];
        
            // // Ensure classification is updated accordingly
            // state.nameFilters = [...new Set(filteredClassifications.map(c => c.classification))];
            // state.reports = state.reports.filter(report => report.year === action.payload);
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(handleGetAllReports.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.reports.filterData?.classifications){
                state.nameFilters = action.payload.reports.filterData.classifications;
            }
            if(action.payload.reports.filterData?.sources){
                state.sourceFilters = action.payload.reports.filterData.sources;
            }
            if(action.payload.reports.filterData?.years){
                state.yearFilters = action.payload.reports.filterData.years;
            }
            state.reports = action.payload.reports.data;
            state.numberOfPages = action.payload.totalPages;
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
export const { getClincsRequest, classificationChange, sourceChange, yearChange } = reportSlice.actions;