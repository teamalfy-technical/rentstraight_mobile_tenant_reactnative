import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
//@ts-ignore
import google from "@/assets/images/google-icon.png";
import { Formik, FormikHandlers, FormikValues } from "formik";
import axios from "axios";
import { baseurl } from "@/app/api/baseurl";
import UserDetails from "./userDetails";
import Password from "./password";
import * as yup from "yup";

const Welcome = () => {
  // const [value, setValue] = useState();
  const [step, setStep] = useState("userDetails");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    full_name: "",
    email: "",
    username: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  };

  const userSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is Required"),
    username: yup.string().required("Username is Required"),
    full_name: yup.string().required("Full Name is Required"),
    phone_number: yup.string().required("Phone Number is Required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const handleSubmit = async (values: FormikValues) => {
    console.log(values);
    setLoading(true);
    await axios
      .post(`${baseurl}/register/`, values, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.data, "response");
        router.push({
          pathname: "/(auth)/signup/otp",
          params: {
            res: JSON.stringify(res.data.data),
            user: JSON.stringify(values),
          },
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const handleStep = (step: string) => {
    setStep(step);
  };

  const rendercomponent = (
    handleSubmit: FormikHandlers["handleSubmit"],
    handleChange: FormikHandlers["handleChange"],
    handleBlur: FormikHandlers["handleBlur"],
    values: FormikValues,
    errors: FormikValues,
    setErrors: FormikValues
  ) => {
    switch (step) {
      case "userDetails":
        return (
          <UserDetails
            change={handleChange}
            errors={errors}
            blur={handleBlur}
            values={values}
            next={handleStep}
            submit={handleSubmit}
            loading={loading}
          />
        );

      case "password":
        return (
          <Password
            change={handleChange}
            errors={errors}
            blur={handleBlur}
            submit={handleSubmit}
            values={values}
            next={handleStep}
            loading={loading}
          />
        );

      default:
        return (
          <UserDetails
            change={handleChange}
            errors={errors}
            blur={handleBlur}
            values={values}
            next={handleStep}
            submit={handleSubmit}
            loading={loading}
          />
        );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={step === "userDetails" ? userSchema : passwordSchema}
      validateOnBlur={true}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
        setErrors,
      }) => (
        <>
          {rendercomponent(
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            setErrors
          )}
        </>
      )}
    </Formik>
  );
};

export default Welcome;
