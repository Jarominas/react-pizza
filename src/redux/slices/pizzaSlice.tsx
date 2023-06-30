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
                        console.log(state, 'Pending')
                  })
                  .addCase(fetchPizzas.fulfilled, (state, action) => {
                        console.log(state, 'Fine')
                        state.items = action.payload
                  })
                  .addCase(fetchPizzas.rejected, (state) => {
                        console.log(state, 'Error')
                  })
      },
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
