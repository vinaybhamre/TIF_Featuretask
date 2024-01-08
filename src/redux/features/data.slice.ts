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

      if(form === "requisitionDetails"){
       state.requisitionDetails.requisitionTitle = value as string
      }


      console.log("State", state);
      console.log("FormState", formState);

      // // Check if the form exists in the state
      // if (formState) {
      //   // Check if the field exists in the form

      //   let fieldValue = formState[field] as keyof InitialStateValue;

      //   if (
      //     fieldValue !== undefined &&
      //     fieldValue !== null &&
      //     typeof fieldValue !== "number"
      //   ) {
      //     // Update the value
      //     fieldValue = value;
      //   } else {
      //     // Handle the case where the field doesn't exist
      //     console.error(`Field '${field}' does not exist in form '${form}'.`);
      //   }
      // } else {
      //   // Handle the case where the form doesn't exist
      //   console.error(`Form '${form}' does not exist.`);
      // }
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
