import { Box, Button, Flex } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { ChangeEvent } from "react";
import * as Yup from "yup";

import {
  moveTabs,
  submitForm,
  updateFormData,
} from "@src/redux/features/data.slice";
import { RootState } from "@src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";

const JobDetailsForm: React.FC = () => {
  const data = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();

  const { tabIndex, jobDetails } = data;

  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: jobDetails.jobTitle,
        jobDetails: jobDetails.jobDetails,
        jobLocation: jobDetails.jobLocation,
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
        // jobPosition: Yup.string().required("Job position is required"), //* Becuase of this form was not submitting even after all fields are filled
      }),
      onSubmit: (values) => {
        // Go to next step
        console.log({ values });
        dispatch(submitForm());
      },
    });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    dispatch(
      updateFormData({
        form: "jobDetails",
        field: e.target.name,
        value: e.target.value,
      }),
    );
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button
            colorScheme="gray"
            type="button"
            onClick={() => dispatch(moveTabs({ value: tabIndex - 1 }))}
          >
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
