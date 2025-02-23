// import { configureStore, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   users: [],
//   products: [],
//   currentUser: null,
//   cart: [],
// };

// const userSlice = createSlice({
//   name: "users",
//   initialState: initialState.users,
//   reducers: {
//     setUsers: (state, action) => action.payload,
//     addUser: (state, action) => [...state, action.payload],
//     deleteUser: (state, action) =>
//       state.filter((user) => user.id !== action.payload),
//   },
// });

// const productSlice = createSlice({
//   name: "products",
//   initialState: initialState.products,
//   reducers: {
//     setProducts: (state, action) => action.payload,
//     addProduct: (state, action) => [...state, action.payload],
//     deleteProduct: (state, action) =>
//       state.filter((product) => product.id !== action.payload),
//     updateProduct: (state, action) => {
//       const index = state.findIndex(
//         (product) => product.id === action.payload.id
//       );
//       if (index !== -1) {
//         state[index] = action.payload;
//       }
//     },
//   },
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialState.currentUser,
//   reducers: {
//     setCurrentUser: (state, action) => action.payload,
//     logoutUser: () => null,
//   },
// });

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: initialState.cart,
//   reducers: {
//     addToCart: (state, action) => [...state, action.payload],
//     removeFromCart: (state, action) =>
//       state.filter((item) => item.id !== action.payload),
//   },
// });

// export const { setUsers, addUser, deleteUser } = userSlice.actions;
// export const { setProducts, addProduct, deleteProduct, updateProduct } =
//   productSlice.actions;
// export const { setCurrentUser, logoutUser } = authSlice.actions;
// export const { addToCart, removeFromCart } = cartSlice.actions;

// const store = configureStore({
//   reducer: {
//     users: userSlice.reducer,
//     products: productSlice.reducer,
//     auth: authSlice.reducer,
//     cart: cartSlice.reducer,
//   },
// });

// export default store;

import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  products: [],
  currentUser: null,
  cart: [],
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState.users,
  reducers: {
    setUsers: (state, action) => action.payload,
    // addUser: (state, action) => [...state, action.payload],
    addUser: (state, action) => {
      if (Array.isArray(state)) {
        return [...state, action.payload];
      }
      return [action.payload];
    },
    deleteUser: (state, action) =>
      state.filter((user) => user.id !== action.payload),
  },
});

const productSlice = createSlice({
  name: "products",
  initialState: initialState.products,
  reducers: {
    setProducts: (state, action) => action.payload,
    addProduct: (state, action) => [...state, action.payload],
    deleteProduct: (state, action) =>
      state.filter((product) => product.id !== action.payload),
    updateProduct: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState.currentUser,
  reducers: {
    setCurrentUser: (state, action) => action.payload,
    // logoutUser: () => null,
    logoutUser: () => initialState.currentUser,
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState.cart,
  reducers: {
    setCart: (state, action) => action.payload,
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.id === newItem.id);
      if (!existingItem) {
        return [...state, newItem];
      }
      return state;
    },
    removeFromCart: (state, action) =>
      state.filter((item) => item.id !== action.payload),
    clearCart: () => [],
  },
});

export const { setCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export const { setUsers, addUser, deleteUser } = userSlice.actions;
export const { setProducts, addProduct, deleteProduct, updateProduct } =
  productSlice.actions;
export const { setCurrentUser, logoutUser } = authSlice.actions;
// export const { addToCart, removeFromCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    products: productSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
