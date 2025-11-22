import {
  editUserInitialValues,
  editUserValidationSchema,
  IEditUserFormValues,
} from "@/validators/editUserSchema";
import { useFormik } from "formik";
import { useAuth } from "@/context/AuthContext";
import { allCountries } from "@/utils/countries";
import { updateUser } from "@/services/user.services";
import { toast } from "sonner";

interface IEditUserForm {
  onClose(): void;
}

export default function EditUserForm({ onClose }: IEditUserForm) {
  const { dataUser, updateUserProfile } = useAuth();
  const token = dataUser?.token ?? "";

  const formik = useFormik<IEditUserFormValues>({
    initialValues: {
      ...editUserInitialValues,
      firstName: dataUser?.user.firstName || "",
      lastName: dataUser?.user.lastName || "",
      country: dataUser?.user.country || "",
      imageUrl: dataUser?.user.imageUrl || "",
    },
    validationSchema: editUserValidationSchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      try {
        const response = await updateUser(
          dataUser?.user.id as string,
          values,
          token
        );

        if (!response) {
          toast.error("Error updating user");
          return;
        }
        updateUserProfile(response);
        toast.success("User updated successfully");
        onClose();
      } catch (err) {
        console.error(err);
        toast.error("Server error while updating user");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" flex flex-col gap-3 w-[30vw]"
    >
      <div className="flex gap-5">
        <div className="flex flex-col gap-1.5 w-1/2">
          <label htmlFor="firstName" className="form-label-sec">
            Fisrt Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input-sec"
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <p id="firstName-errors" className="text-red-500">
              {formik.errors.firstName}
            </p>
          ) : null}

          <label htmlFor="country" className="form-label-sec">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input-sec"
          >
            <option value="">Select your country</option>
            {allCountries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {formik.touched.country && formik.errors.country && (
            <p className="text-red-500">{formik.errors.country}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5 w-1/2">
          <label htmlFor="lastName" className="form-label-sec">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input-sec"
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <p id="lastName-errors" className="text-red-500">
              {formik.errors.lastName}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-strong">
            {" "}
            <span className="text-red-500">*</span> Required fields.{" "}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            Close
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-4 py-2 rounded-lg bg-blue-strong text-white hover:bg-blue-medium cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
