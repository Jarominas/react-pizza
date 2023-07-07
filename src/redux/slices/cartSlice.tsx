import { createSlice } from '@reduxjs/toolkit'

type CartItem = {
      id: string
      imageUrl: string
      price: number
      count: number
      type: string
      size: number
      title: string
}

interface CartSliceState {
      totalPrice: number
      items: CartItem[]
}
const initialState = {
      totalPrice: 0,
      items: [],
}

const cartSlice = createSlice({
      name: 'cart',
      initialState,
      reducers: {
            addItem(state, action) {
                  //   state.items.push(action.payload)

                  const findItem = state.items.find(
                        (obj) => obj.id == action.payload.id
                  )

                  if (findItem) {
                        findItem.count++
                  } else {
                        state.items.push({
                              ...action.payload,
                              count: 1,
                        })
                  }
                  state.totalPrice = state.items.reduce((sum, obj) => {
                        return obj.price * obj.count + sum
                  }, 0)
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
            },

            removeItem(state, action) {
                  state.items = state.items.filter(
                        (item) => item.id !== action.payload
                  )
            },
            clearItems(state) {
                  state.items = []
                  state.totalPrice = 0
            },
      },
})

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions
export default cartSlice.reducer
