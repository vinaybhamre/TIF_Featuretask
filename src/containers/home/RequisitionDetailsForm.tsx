import { Box, Button, Flex } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { ChangeEvent } from "react";
import * as Yup from "yup";

import { submitForm, updateFormData } from "@src/redux/features/data.slice";
import { RootState } from "@src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { useData } from "./DataProvider";
import { genderOptions, urgencyOptions } from "./constants";

const RequisitionDetailsForm: React.FC = () => {
  // const data = useSelector((state: RootState) => state.data.requisitionDetails);

  // const dispatch = useDispatch();

  const data = useData();

  // const { state, setState } = data;

  console.log("State", data?.state);
  console.log("SetState", data?.setState);
  console.log("Data", data);

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: data?.state.requisitionDetails.requisitionTitle || "",
      noOfOpenings: data?.state.requisitionDetails.noOfOpenings || 0,
      urgency: data?.state.requisitionDetails.urgency || "",
      gender: data?.state.requisitionDetails.gender || "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      //  Go to Next Step
      // dispatch(submitForm());

      console.log({ values });
      data?.setState({
        ...data?.state,
        tabIndex: 1,
      });
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);

    data?.setState({
      ...data?.state,
      requisitionDetails: {
        ...data?.state.requisitionDetails,
        [e.target.name]: e.target.value,
      },
    });

    // dispatch(
    //   updateFormData({
    //     form: "requisitionDetails",
    //     field: e.target.name,
    //     value: e.target.value,
    //   }),
    // );
  };

  const handleSelectChange = (name: string, selectedValue: string) => {
    setFieldValue(name, selectedValue);

    data?.setState({
      ...data?.state,
      requisitionDetails: {
        ...data?.state.requisitionDetails,
        [name]: selectedValue,
      },
    });

    // dispatch(
    //   updateFormData({
    //     form: "requisitionDetails",
    //     field: name,
    //     value: selectedValue,
    //   }),
    // );
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={handleSelectChange}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={handleSelectChange}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
