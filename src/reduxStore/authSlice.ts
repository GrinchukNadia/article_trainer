import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

type User = {
  token: string | null;
};


const initialState: User = {
  token: null
};

export const authSlice = createSlice({
  name: "currentUser",
  initialState: initialState,
  reducers: {
    safeUser(state, action) {
      if(action.payload){
         state.token = action.payload;
        }
    },
    removeUser(state) {
      state.token = null;
    }
  },
});

export const { safeUser, removeUser } = authSlice.actions;

// persist local storage------------------------------------------------------------------------------
const userPersistConfig = {
  key: "user",
  storage,
};
export default persistReducer(userPersistConfig, authSlice.reducer);
// persist local storage------------------------------------------------------------------------------
