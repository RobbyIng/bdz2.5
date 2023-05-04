import { createSlice } from '@reduxjs/toolkit'
import { myInitialState } from '../initialState'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: myInitialState.cart,
  reducers: {
    addCartItem(state, action) {
      console.log(state.list)
      // state.push(action.payload)
      state.list =
        state.list.length > 0
          ? [...state.list, action.payload]
          : [action.payload]
      return state
    },
    // Object.assign({}, state, { tasks: [...state.tasks,  { id: '5', task:'test123'}] });
    //   changeSearchValue(state, action) {
    //     state.search = action.payload
    //   }

    // state.id ? [...state, action.payload] : action.payload
  },
})

export const { addCartItem } = cartSlice.actions
export const cartReducer = cartSlice.reducer
