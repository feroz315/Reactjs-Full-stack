import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: []
}

const MyCartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        AddItem: ( state, action ) => {
             state.carts = [...state.carts, action.payload]
            // state.carts.push(action.payload);
        },
        DelItem: (state,action) => {
            let newBasket = [...state.carts];
            let ItemIndex = state.carts.findIndex(item => item.id == action.payload.id);
            if(ItemIndex >= 0){
                newBasket.splice(ItemIndex,1)
            }else{
                console.log("not working")
            }
            state.carts = newBasket;
        },
        DelCard: (state,action ) => {
            // const productId = action.payload;
            state.carts = state.carts.filter(item => item.id !== action.payload);
            // state.carts = state.carts.filter(item => item.id !== productId);
        },
        emptyCart: (state,action) => {
            state.carts = [];
        },
    }

})


export const { AddItem,DelItem,emptyCart,DelCard } = MyCartSlice.actions;
export const selectcartItems = state => state.cart.carts;
export const selectcartItemsbyId = (state,id) => state.cart.carts.filter(item => item.id == id);
export const selectTotal = state => state.cart.carts.reduce((total, { price, quantity = 1 }) => total + (price * quantity), 0);

// export const SelectItem = state => state.Cart.carts;
export default MyCartSlice.reducer;

// ((total,item) => total = total += (item.price * total),0);