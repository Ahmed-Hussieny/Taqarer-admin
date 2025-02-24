import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
export const handleGetAllClassifications = createAsyncThunk("statistic/handleGetAllClassifications", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getReportsClassification`,{
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
export const handleGetAllNumberOfReportsForClassification = createAsyncThunk("statistic/handleGetAllNumberOfReportsForClassification", async ({
    classification
}:{classification: string}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getReportsCountersForClassification?classification=${classification}`,{
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

export const handleGetAllSource= createAsyncThunk("statistic/handleGetAllSource", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getReportsSource`,{
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
export const handleGetAllNumberOfReportsForSourses = createAsyncThunk("statistic/handleGetAllNumberOfReportsForSourses", async ({
    source
}:{source: string}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getReportsCountersForSource?source=${source}`,{
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

export const handleGetgetReportsCountersBetweenYears = createAsyncThunk("statistic/handleGetgetReportsCountersBetweenYears", async ({
    startYear,
    endYear
}:{startYear: string, 
    endYear: string
}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getReportsCountersBetweenYears?startYear=${startYear}&endYear=${endYear}`,{
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

// getReportsChartData
export const handleGetReportsChartData = createAsyncThunk("statistic/handleGetReportsChartData", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getReportsChartData`,{
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

// getMostRepeatedClassification
export const handleGetMostRepeatedClassification = createAsyncThunk("statistic/handleGetMostRepeatedClassification", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getMostRepeatedClassification`,{
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

export const handleGetTop5RepeatedClassifications = createAsyncThunk("statistic/handleGetTop5RepeatedClassifications", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getTop5RepeatedClassifications`,{
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

export const handleGetMostRepeatedSource = createAsyncThunk("statistic/handleGetMostRepeatedSource", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getMostRepeatedSource`,{
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

export const handleGetTop5RepeatedSources = createAsyncThunk("statistic/handleGetTop5RepeatedSources", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/report/getTop5RepeatedSources`,{
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
const statisticsSlice = createSlice({
    name: "statistic",
    initialState: {
        classifications: [] as string[],
        numberOfClassifications: 0,
        sources: [] as string[],
        numberOfSourses: 0,
        numberOfReportsBetweenYears: 0,
        mostRepetedClassification: '',
        mostRepeted5Classifications: [],
        mostRepetedSource: '',
        mostRepeted5Sources: [],
        chartData : [{
            year: 0,
            reports: 0
        }],
        loading: false,
        error: null,
    },
    reducers: {
        getClincsRequest(state) {
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        //^ handleGetAllClassifications
        builder.addCase(handleGetAllClassifications.fulfilled, (state, action) => {
            state.classifications = action.payload.classifications;
            state.loading = false;
        });
        builder.addCase(handleGetAllClassifications.rejected, (state) => {
            state.loading = false;
        });
        //^ handleGetAllNumberOfReportsForClassification
        builder.addCase(handleGetAllNumberOfReportsForClassification.fulfilled, (state, action) => {
            state.numberOfClassifications = action.payload.reportsCount;
            state.loading = false;
        });
        builder.addCase(handleGetAllNumberOfReportsForClassification.rejected, (state) => {
            state.loading = false;
        });

        //^ handleGetAllSource
        builder.addCase(handleGetAllSource.fulfilled, (state, action) => {
            state.sources = action.payload.sources;
            state.loading = false;
        });
        builder.addCase(handleGetAllSource.rejected, (state) => {
            state.loading = false;
        });
        //^ handleGetAllNumberOfReportsForSourses
        builder.addCase(handleGetAllNumberOfReportsForSourses.fulfilled, (state, action) => {
            state.numberOfSourses = action.payload.reportsCount;
            state.loading = false;
        });
        builder.addCase(handleGetAllNumberOfReportsForSourses.rejected, (state) => {
            state.loading = false;
        });

        //^ handleGetgetReportsCountersBetweenYears
        builder.addCase(handleGetgetReportsCountersBetweenYears.fulfilled, (state, action) => {
            state.numberOfReportsBetweenYears = action.payload.reportsCount;
            state.loading = false;
        });
        builder.addCase(handleGetgetReportsCountersBetweenYears.rejected, (state) => {
            state.loading = false;
        });

        //^ handleGetReportsChartData
        builder.addCase(handleGetReportsChartData.fulfilled, (state, action) => {
            state.chartData = action.payload.data;
            state.loading = false;
        });
        builder.addCase(handleGetReportsChartData.rejected, (state) => {
            state.loading = false
        });
        //^ handleGetMostRepeatedClassification
        builder.addCase(handleGetMostRepeatedClassification.fulfilled, (state, action) => {
            state.mostRepetedClassification = action.payload.data._id;
            state.loading = false;
        });
        builder.addCase(handleGetMostRepeatedClassification.rejected, (state) => {
            state.loading = false
        });
        //^ handleGetTop5RepeatedClassifications
        builder.addCase(handleGetTop5RepeatedClassifications.fulfilled, (state, action) => {
            state.mostRepeted5Classifications = action.payload.data;
            state.loading = false;
        });
        builder.addCase(handleGetTop5RepeatedClassifications.rejected, (state) => {
            state.loading = false
        });

        //^ handleGetMostRepeatedSource
        builder.addCase(handleGetMostRepeatedSource.fulfilled, (state, action) => {
            state.mostRepetedSource = action.payload.data._id;
            state.loading = false;
        });
        builder.addCase(handleGetMostRepeatedSource.rejected, (state) => {
            state.loading = false
        });
        //^ handleGetTop5RepeatedSources
        builder.addCase(handleGetTop5RepeatedSources.fulfilled, (state, action) => {
            state.mostRepeted5Sources = action.payload.data;
            state.loading = false;
        });
        builder.addCase(handleGetTop5RepeatedSources.rejected, (state) => {
            state.loading = false
        });
    },
});

export default statisticsSlice.reducer;