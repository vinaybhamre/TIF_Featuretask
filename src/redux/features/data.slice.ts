import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Draft } from "immer";
type RequisitionDetails = {
  gender: string;
  noOfOpenings: number;
  requisitionTitle: string;
  urgency: string;
};

type JobDetails = {
  jobDetails: string;
  jobLocation: string;
  jobTitle: string;
};

type InterviewSettings = {
  interviewDuration: string;
  interviewLanguage: string;
  interviewMode: string;
};

type DraftTable = {
  title?: string | undefined;
  openings?: number | undefined;
  gender?: string | undefined;
  urgency?: string | undefined;
  jobTitle?: string | undefined;
  jobDetails?: string | undefined;
  jobLocation?: string | undefined;
  interviewMode?: string | undefined;
  interviewDuration?: string | undefined;
  interviewLanguage?: string | undefined;
};

type InitialStateValue = {
  tabIndex: number;
  requisitionDetails: RequisitionDetails;
  jobDetails: JobDetails;
  interviewSettings: InterviewSettings;
  //   draftTable: DraftTable;
};

const initialState: InitialStateValue = {
  tabIndex: 0,
  requisitionDetails: {
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
  },
  jobDetails: {
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
  },
  interviewSettings: {
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
  },
  //   draftTable: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateFormData: (
      state,
      action: PayloadAction<{
        form: keyof InitialStateValue;
        field: string;
        value: string | number;
      }>,
    ) => {
      const { form, field, value } = action.payload;

      const formState = state[form];

      if (typeof formState !== "number") {
        formState[field] = value;
      }
    },
    moveTabs: (state, action) => {
      state.tabIndex = action.payload.value;
    },
    submitForm: (state) => {
      // Handle form submission logic
      // Update the Redux state accordingly
      // Navigate to the next tab if successful
      state.tabIndex = Math.min(state.tabIndex + 1, 3);
    },
  },
});

export const { updateFormData, submitForm, moveTabs } = dataSlice.actions;

export default dataSlice.reducer;
