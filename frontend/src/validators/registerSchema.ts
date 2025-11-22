import * as Yup from "yup";

export interface IRegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .matches(
      /^[A-Za-zÀ-ÿ\s]+$/,
      "First name can only contain letters and spaces"
    )
    .required("Please provide your first name"),
  lastName: Yup.string()
    .matches(
      /^[A-Za-zÀ-ÿ\s]+$/,
      "Last name can only contain letters and spaces"
    )
    .required("Please provide your last name"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("This field is required"),
  password: Yup.string()
    .min(8, "You need at least 8 characters")
    .matches(/[A-Z]/, "You need at least 1 uppercase letter")
    .matches(/[@$!%*?&#]/, "You need at least 1 special character")
    .required("This field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
