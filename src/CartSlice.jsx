import { createSlice } from '@reduxjs/toolkit';

const parseCost = (cost) => {
    return parseFloat(cost.replace('$', '')); // Highlighted change: Convert cost to number
};


export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0 // Initialize items as an empty array
    },
    reducers: {  
        
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const numericCost = parseCost(cost); // Highlighted change: Convert cost to number
            
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost: numericCost, quantity: 1 }); // Highlighted change: Use numericCost
            }

            state.totalQuantity = calculateTotalQuantity(state.items); 
        },


        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload.name); // Highlighted change
            state.totalQuantity = calculateTotalQuantity(state.items); // Update total quantity
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
                // Adjustment: Ensure quantity is a positive integer
                itemToUpdate.quantity = Math.max(1, quantity); // Highlighted change
                state.totalQuantity = calculateTotalQuantity(state.items); // Update total quantity
            }


        },
    },
});

const calculateTotalQuantity = (items) => {
    return items.reduce((total, item) => total + Number(item.quantity), 0);
  };

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;



export default CartSlice.reducer;
