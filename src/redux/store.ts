import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import onboardingReducer from "./slices/onboardingSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistOnBoardConfig = {
  key: "onboarding",
  storage,
};
const persistonBoardingReducer = persistReducer(
  persistOnBoardConfig,
  onboardingReducer
);

export const store = configureStore({
  reducer: {
    onboarding: persistonBoardingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
