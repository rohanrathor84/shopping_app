import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiClient from "../../services/Apiclient"

type Shop = {
    id: number,
    name: string,
    description: string
}

type ShopState = {
    shop: Shop[],
    loading: boolean,
    error: string | null
}

const initialData: ShopState = {
    shop: [],
    loading: false,
    error: null
}

export const fetchShop = createAsyncThunk("", async () => {
    const response = await apiClient.get('https://jsonplaceholder.typicode.com/posts')
    return response.data as Shop[]
})

const shopReducer = createSlice({
    name: "shop",
    initialState: initialData,
    reducers: {
        sampleData: (state, action) => {
            state.shop = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShop.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchShop.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? "Something went wrong"
            })
    }
})

export const { sampleData } = shopReducer.actions

export default shopReducer.reducer
