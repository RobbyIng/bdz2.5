import { createSlice } from '@reduxjs/toolkit'
import { myInitialState } from '../initialState'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: myInitialState.cart,
  reducers: {
    addCartItem(state, action) {
      return state ? [...state, action.payload] : [action.payload]
    },
    deleteCartItem(state, action) {
      return state.filter((el) => el.id !== action.payload)
    },
    cleanCart: () => {
      return myInitialState.cart
    },
    incrementCartItem(state, action) {
      return state.forEach((el) =>
        el.id === action.payload ? (el.count = el.count + 1) : el.count
      )
    },
    decrementCartItem(state, action) {
      return state.forEach((el) =>
        el.id === action.payload ? (el.count = el.count - 1) : el.count
      )
    },
  },
})

export const {
  addCartItem,
  cleanCart,
  deleteCartItem,
  incrementCartItem,
  decrementCartItem,
} = cartSlice.actions
export const cartReducer = cartSlice.reducer
