import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
      'pizza/fetchPizzasStatus',
      async (params: {
            sortBy: string
            order: string
            category: string
            search: string
            currentPage: number
      }) => {
            const { sortBy, order, category, search, currentPage } = params
            const { data } = await axios.get(
                  `https://6486e8e2beba6297278f7688.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            )
            return data
      }
)

const initialState = {
      items: [],
      status: 'loading',
}

const pizzaSlice = createSlice({
      name: 'pizza',
      initialState,
      reducers: {
            setItems(state, action) {
                  state.items = action.payload
            },
      },
      extraReducers: (builder) => {
            builder
                  .addCase(fetchPizzas.pending, (state) => {
                        state.status = 'loading'
                        state.items = []
                  })
                  .addCase(fetchPizzas.fulfilled, (state, action) => {
                        state.items = action.payload
                        state.status = 'success'
                  })
                  .addCase(fetchPizzas.rejected, (state) => {
                        state.status = 'error'
                        state.items = []
                  })
      },
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
