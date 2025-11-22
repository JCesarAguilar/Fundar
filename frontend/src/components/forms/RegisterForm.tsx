"use client";

import Link from "next/link";
import {
  IRegisterFormValues,
  registerInitialValues,
  registerValidationSchema,
} from "@/validators/registerSchema";
import { useFormik } from "formik";
import { PATHROUTES } from "@/helpers/NavItems";
import { toast } from "sonner";
import { registerUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const formik = useFormik<IRegisterFormValues>({
    initialValues: registerInitialValues,
    validationSchema: registerValidationSchema,

    onSubmit: async (values, { resetForm }) => {
      const response = await registerUser(values);
      if (response.success) {
        toast.success("User registered successfully");
        router.push(PATHROUTES.LOGIN);
      } else {
        toast.error(response.message || "Registration failed");
      }
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-2 min-w-[25vw]"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="form-label">
          NAME
        </label>
        <div>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 border border-gray-500 border-r-0 rounded-l-md w-1/2"
          />
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-3 border border-gray-500 rounded-r-md w-1/2"
          />
        </div>
        <div className="flex gap-3">
          {formik.errors.firstName && formik.touched.firstName ? (
            <p id="firstName-errors" className="text-red-500">
              {formik.errors.firstName}
            </p>
          ) : null}
          {formik.errors.lastName && formik.touched.lastName ? (
            <p id="lastName-errors" className="text-red-500">
              {formik.errors.lastName}
            </p>
          ) : null}
        </div>

        <label htmlFor="email" className="form-label">
          EMAIL
        </label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="example@mail.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-input"
        />
        {formik.errors.email && formik.touched.email ? (
          <p id="email-errors" className="text-red-500">
            {formik.errors.email}
          </p>
        ) : null}

        <label htmlFor="password" className="form-label">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="********"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-input"
        />
        {formik.errors.password && formik.touched.password ? (
          <p id="password-errors" className="text-red-500">
            {formik.errors.password}
          </p>
        ) : null}

        <label htmlFor="confirmPassword" className="form-label">
          CONFIRM YOUR PASSWORD
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="********"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-input"
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          <p className="text-red-500">{formik.errors.confirmPassword}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="btn-form-primary mt-4"
        >
          {formik.isSubmitting ? "SIGNING UP..." : "REGISTER"}
        </button>

        <Link
          href={PATHROUTES.LOGIN}
          className="text-blue-strong hover:underline text-center pt-2 text-sm"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  );
}
