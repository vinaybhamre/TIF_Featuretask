import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

type InitialStateValue = {
  tabIndex: number;
  requisitionDetails: RequisitionDetails;
  jobDetails: JobDetails;
  interviewSettings: InterviewSettings;
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

      if (formState) {
        // formState[field] = value; //! Type Error
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
