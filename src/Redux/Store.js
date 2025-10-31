import { configureStore } from "@reduxjs/toolkit";
import CartSlice from './Cartslice.js';
// import productSlice from "./ProductSlice.js";

export const store=configureStore(
    {
        reducer:{
            cart:CartSlice,
            // product: productSlice,

        }
    }
)