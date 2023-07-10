import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDataFromLS } from '../../utils/getDataFromLS'
import { calcTotalSum } from '../../utils/calcTotalSum'

export type CartItem = {
      id: number
      imageUrl: string
      price: number
      count: number
      type: string
      size: number
      title: string
}

interface CartSliceState {
      items: CartItem[]
      totalPrice: number
}

const initialState: CartSliceState = getDataFromLS()

const cartSlice = createSlice({
      name: 'cart',
      initialState,
      reducers: {
            addItem(state, action: PayloadAction<CartItem>) {
                  const findItem = state.items.find(
                        (obj) => obj.id === action.payload.id
                  )

                  if (findItem) {
                        findItem.count++
                  } else {
                        state.items.push({
                              ...action.payload,
                              count: 1,
                        })
                  }

                  state.totalPrice = calcTotalSum(state.items)
            },

            minusItem(state, action) {
                  const findItem = state.items.find(
                        (obj) => obj.id == action.payload.id
                  )
                  if (findItem) {
                        if (findItem.count > 0) {
                              findItem.count--
                        } else {
                              findItem.count = 0
                        }
                  }
                  state.totalPrice = calcTotalSum(state.items)
            },

            removeItem(state, action) {
                  state.items = state.items.filter(
                        (item) => item.id !== action.payload
                  )
                  state.totalPrice = calcTotalSum(state.items)
            },
            clearItems(state) {
                  state.items = []
                  state.totalPrice = 0
            },
      },
})

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions
export default cartSlice.reducer
