import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Products: []
}

const ProductSlice = createSlice({
    name:'Product',
    initialState,
    reducers:{
        AddCartItem: ( state, action ) => {
           state.Products = action.payload 
        },
    },
    
});


export const { AddCartItem } = ProductSlice.actions;
export default ProductSlice.reducer;

