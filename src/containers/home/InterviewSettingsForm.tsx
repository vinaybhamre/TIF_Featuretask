import { Box, Button, Flex } from "@chakra-ui/react";
import { moveTabs, updateFormData } from "@src/redux/features/data.slice";
import { RootState } from "@src/redux/store";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC = () => {
  const data = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();

  const { interviewSettings, tabIndex } = data;

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: interviewSettings.interviewMode,
      interviewDuration: interviewSettings.interviewDuration,
      interviewLanguage: interviewSettings.interviewLanguage,
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"), //* These are the validations
      interviewDuration: Yup.string().required(
        //* for the interview setting form
        "Interview Duration is required",
      ),
      interviewLanguage: Yup.string().required(
        "Interview Language is required",
      ),
    }),
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

  const handleSelectChange = (name: string, selectedValue: string) => {
    setFieldValue(name, selectedValue);

    dispatch(
      updateFormData({
        form: "interviewSettings",
        field: name,
        value: selectedValue,
      }),
    );
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={handleSelectChange}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={handleSelectChange}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={handleSelectChange}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
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
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
