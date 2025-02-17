import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ApiErrorResponse } from "../Interfaces/error";
import { Evidence } from "../Interfaces/evidence";

export const handleGetAllArticles = createAsyncThunk("guide/handleGetAllArticles", async ({
    page,
    title = ""
}: { page: number, title?: string}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/article/get-articles?page=${page}&title=${title}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleAddArticle = createAsyncThunk("article/handleAddArticle", async (apiData: FormData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/article/add-article`, apiData,{
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

export const handleDeleteArticle = createAsyncThunk("guide/handleDeleteArticle", async (id: string) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/article/delete-article/${id}`,{
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

export const handleGetArticle = createAsyncThunk("guide/handleGetArticle", async (id: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/article/get-article/${id}`);
        return response.data;
    } catch (error) {
        const err = error as ApiErrorResponse;
        return err.response.data;
    };
});

export const handleUpdateArticle = createAsyncThunk("guide/handleUpdateArticle", async ({ id, apiData }: {
    id: string, apiData: FormData
}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/article/update-article/${id}`, apiData,{
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

const articleSlice = createSlice({
    name: "article",
    initialState: {
        articles: [] as Evidence[],
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
        builder.addCase(handleGetAllArticles.fulfilled, (state, action) => {
            state.loading = false;
            state.articles = action.payload.articles;
            state.numberOfPages = action.payload.numberOfPages;

        });
        builder.addCase(handleGetAllArticles.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleAddArticle.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleAddArticle.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleDeleteArticle.fulfilled, (state, action) => {
            state.loading = false;
            state.articles = state.articles.filter(article => article._id !== action.payload.article._id);
        });
        builder.addCase(handleDeleteArticle.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleGetArticle.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleGetArticle.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(handleUpdateArticle.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(handleUpdateArticle.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default articleSlice.reducer;