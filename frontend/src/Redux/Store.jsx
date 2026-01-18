import { configureStore } from "@reduxjs/toolkit";

import ProductSlice from "./ProductSlice";
import MyCartSlice from "./CartSlice";



export const store = configureStore({
    reducer:{
        product: ProductSlice,
        cart: MyCartSlice
    },

});

