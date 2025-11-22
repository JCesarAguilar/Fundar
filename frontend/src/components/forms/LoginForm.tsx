"use client";

import Link from "next/link";
import {
  ILoginFormValues,
  loginInitialValues,
  loginValidationSchema,
} from "@/validators/loginSchema";
import { PATHROUTES } from "@/helpers/NavItems";
import { loginUser } from "@/services/auth.services";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginForm() {
  const { setDataUser } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<ILoginFormValues>({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,

    onSubmit: async (values, { resetForm }) => {
      const response = await loginUser(values);
      if (!response.success) {
        toast.error(response.message || "Login failed");
        return;
      }
      setDataUser({
        user: response.user,
        token: response.token,
      });
      toast.success("Login successful");
      router.push(PATHROUTES.PROJECTS);
      resetForm();
    },
  });

  const handleGoogleLogin = () => {
    window.location.href = `${apiURL}/auth/google`;
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
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
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="form-input w-full"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-strong hover:text-black "
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p id="password-errors" className="text-red-500">
            {formik.errors.password}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="btn-form-primary mt-4"
        >
          {formik.isSubmitting ? "SIGNIN IN..." : "SIGN IN"}
        </button>

        <div className="flex items-center my-4">
          <hr className="grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or sign in below</span>
          <hr className="grow border-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn-form-secondary"
        >
          SIGN IN WITH GMAIL
        </button>

        <div className="text-center text-sm mt-2">
          <Link
            href={PATHROUTES.REGISTER}
            className="text-blue-strong hover:underline"
          >
            Create an account
          </Link>
        </div>
      </form>
    </>
  );
}
