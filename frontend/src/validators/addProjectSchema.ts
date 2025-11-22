import * as Yup from "yup";

export interface IProjectFormValues {
  title: string;
  resume: string;
  description: string;
  country: string;
  goalAmount: number;
  imageUrls: string[];
  // categoryId: number;
}

export const projectFormInitialValues: IProjectFormValues = {
  title: "",
  resume: "",
  description: "",
  country: "",
  goalAmount: 0,
  imageUrls: [],
  // categoryId: 0,
};

export const projectValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  resume: Yup.string()
    .trim()
    .max(180, "Resume must be at most 180 characters")
    .required("Resume is required"),
  description: Yup.string()
    .trim()
    .max(600, "Description must be at most 600 characters")
    .required("Description is required"),
  country: Yup.string().required("Country is required"),
  goalAmount: Yup.number()
    .typeError("Goal amount must be a number")
    .positive("Goal amount must be greater than zero")
    .required("Goal amount is required"),
  imageUrls: Yup.array()
    .of(Yup.string().url("Each image must be a valid URL"))
    .length(4, "Exactly 4 images are required"),
  // categoryId: Yup.string().typeError("Category is required"),
  // .required("Category is required"),
});

export const editProjectValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .max(50, "Title must be at most 50 characters")
    .optional(),
  resume: Yup.string()
    .trim()
    .max(180, "Resume must be at most 180 characters")
    .optional(),
  description: Yup.string()
    .trim()
    .max(600, "Description must be at most 600 characters")
    .optional(),
  country: Yup.string().optional(),
  goalAmount: Yup.number()
    .typeError("Goal amount must be a number")
    .min(0, "Goal amount cannot be negative")
    .optional(),
  imageUrls: Yup.array()
    .of(Yup.string().url("Each image must be a valid URL"))
    .max(4, "You can upload up to 4 images")
    .optional(),
  // categoryId: Yup.string().nullable().optional(),
});
