import { combineReducers, configureStore } from "@reduxjs/toolkit";
import srsReduser from "./srsSlice";
import sprintReduser from "./sprintSlice";
import activityReducer from "./activitySlice";

// persist local storage---------------------------------------------------------------------------
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// persist local storage---------------------------------------------------------------------------

export const rootReducer = combineReducers({
  srs: srsReduser,
  sprint: sprintReduser,
  activity: activityReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  // persist local storage---------------------------------------------------------------------------
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // игнорируем экшены redux-persist, чтобы не ругался RTK
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // persist local storage---------------------------------------------------------------------------
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// persist local storage---------------------------------------------------------------------------
export const persistor = persistStore(store);
// persist local storage---------------------------------------------------------------------------
