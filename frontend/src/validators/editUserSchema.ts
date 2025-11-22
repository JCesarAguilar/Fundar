import * as Yup from "yup";

export interface IEditUserFormValues {
  firstName: string;
  lastName: string;
  country?: string;
  imageUrl?: string;
}

export const editUserInitialValues: IEditUserFormValues = {
  firstName: "",
  lastName: "",
  country: "",
  imageUrl: "",
};

export const editUserValidationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(2, "First name must have at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .trim()
    .min(2, "Last name must have at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .required("Last name is required"),
  country: Yup.string().trim().optional(),
  imageUrl: Yup.string().url("Invalid image URL format").nullable(),
});
