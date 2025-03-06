import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { Evidence } from "../Interfaces/evidence";

export const handleGetAllEvidences = createAsyncThunk("guide/handleGetAllEvidences", async ({
    page,
    classification = "",
    source = "",
    year = "",
    custom = ""
}: { page: number, classification?: string, source?: string, year?: string, custom?: string }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/guide/GetALLGuides?page=${page}&custom=${custom}&classification=${classification}&source=${source}&year=${year}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleGetEvidence = createAsyncThunk("guide/handleGetEvidence", async (id: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/guide/getGuide/${id}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleAddEvidence = createAsyncThunk("guide/handleAddEvidence", async (apiData:FormData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/guide/addSingleGuide`,apiData,{
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

export const handleUpdateEvidence = createAsyncThunk("guide/handleUpdateEvidence", async ({id,apiData}:{
    id: string,apiData: FormData}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/guide/updateGuide/${id}`,apiData,{
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


export const handleAddEvidences = createAsyncThunk("guide/handleAddEvidences", async (apiData:FormData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/guide/addGuidesFromExcel`,apiData,{
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

export const handleDeleteEvidence = createAsyncThunk("guide/handleDeleteEvidence", async (id: string) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/guide/deleteGuide/${id}`,{
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

export const handelDownloadEvidence = createAsyncThunk(
    "guide/handelDownloadEvidence",
    async (id: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/guide/downloadGuide/${id}`, {
          responseType: "blob",
          headers:{
            accesstoken: `Bearer_${localStorage.getItem("authToken")}`
        }
        });
  
        // Create a Blob URL and trigger the download
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `report-${id}`); // Set filename
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
  

const evidenceSlice = createSlice({
    name: "evidence",
    initialState: {
        evidences: [] as Evidence[],
        classifications: [] as string[],
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
        builder.addCase(handleGetAllEvidences.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.guides.filterData?.classifications){
                state.classifications = action.payload.guides.filterData.classifications;
            }
            if(action.payload.guides.filterData?.sources){
                state.sourceFilters = action.payload.guides.filterData.sources;
            }
            if(action.payload.guides.filterData?.years){
                state.yearFilters = action.payload.guides.filterData.years;
            }
            state.evidences = action.payload.guides.data;
            state.numberOfPages = action.payload.guides.totalPages;
        });
        builder.addCase(handleGetAllEvidences.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleAddEvidence.fulfilled, (state, action) => {
            state.loading = false;
            state.evidences.push(action.payload.report);
        });
        builder.addCase(handleAddEvidence.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleAddEvidences.fulfilled, (state, action) => {
            state.loading = false;
            state.evidences = action.payload.reports;
        });
        builder.addCase(handleAddEvidences.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleDeleteEvidence.fulfilled, (state, action) => {
            state.loading = false;
            state.evidences = state.evidences.filter(evidence => evidence._id !== action.payload.guide._id);
        });
        builder.addCase(handleDeleteEvidence.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handelDownloadEvidence.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handelDownloadEvidence.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleGetEvidence.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleGetEvidence.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleUpdateEvidence.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.evidences.findIndex(guide => guide._id === action.payload.guide._id);
            state.evidences[index] = action.payload.guide;
        });
        builder.addCase(handleUpdateEvidence.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default evidenceSlice.reducer;