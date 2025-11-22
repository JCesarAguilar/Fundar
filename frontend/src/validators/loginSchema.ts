import * as Yup from "yup";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export const loginInitialValues: ILoginFormValues = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please, enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
