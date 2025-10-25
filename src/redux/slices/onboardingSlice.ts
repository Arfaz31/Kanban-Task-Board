/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface OnboardingState {
  currentStep: number;
  userInfo: {
    name: string;
    email: string;
  };
  organizationInfo: {
    workspaceName: string;
  };
  selectedPlan: string;
  isCompleted: boolean;
}

const initialState: OnboardingState = {
  currentStep: 1,
  userInfo: {
    name: "",
    email: "",
  },
  organizationInfo: {
    workspaceName: "",
  },
  selectedPlan: "",
  isCompleted: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setUserInfo: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.userInfo = action.payload;
    },
    setOrganizationInfo: (
      state,
      action: PayloadAction<{ workspaceName: string }>
    ) => {
      state.organizationInfo = action.payload;
    },
    setSelectedPlan: (state, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload;
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  setCurrentStep,
  setUserInfo,
  setOrganizationInfo,
  setSelectedPlan,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;

export const currentUser = (state: any) => state.onboarding.userInfo;
