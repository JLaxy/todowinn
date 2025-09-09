"use client";

import { authService } from "@/services/auth-service";
import { ApiError } from "@/types/api-error";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  // Variables
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    pass?: string;
    repeatPass?: string;
  }>({});
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    console.log("clicked");
    // Avoid refresh
    e.preventDefault();
    const newErrors: typeof errors = {};

    // Validate account credentials
    if (!isInputValid(newErrors)) return;

    console.log("Form submitted:", { email, pass });

    try {
      const res = await authService.signup(email, pass);
      handleRes(res);
    } catch (err) {
      handleError(err as ApiError);
    }
  };

  const handleError = (error: ApiError) => {
    if (error.statusCode === 409) {
      setErrors({ email: "This email is already used!" });
    } else if (error.statusCode === 400) {
      setErrors({ email: "Invalid email!" });
    } else {
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  const handleRes = (res: AxiosResponse) => {
    if (res.status === 201) {
      toast.success(
        "Member successfully registered! Please login with your credentials."
      );
      // Delay then redirect
      setTimeout(() => {
        router.push("/login");
      }, 1800);
    }
  };

  // Validates input
  const isInputValid = (newErrors: typeof errors) => {
    let valid = true;

    // Email validation
    if (!email.includes("@") && !email.includes(".")) {
      newErrors.email = "Please enter a valid email.";
      valid = false;
    }

    // Password validation
    if (pass.length < 6) {
      newErrors.pass = "Password must be at least 6 characters.";
      valid = false;
    }

    // Repeat password validation
    if (pass !== repeatPass) {
      newErrors.repeatPass = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          {GetInputFields(
            email,
            setEmail,
            "you@example.com",
            "Email",
            "email",
            "email",
            errors.email
          )}
          {GetInputFields(
            pass,
            setPass,
            "********",
            "Password",
            "password",
            "password",
            errors.pass
          )}
          {GetInputFields(
            repeatPass,
            setRepeatPass,
            "********",
            "Repeat Password",
            "repeat_password",
            "password",
            errors.repeatPass
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <Toaster position="bottom-center" />
      </div>
    </div>
  );
}

// Returns input fields
function GetInputFields(
  input: string,
  setFunction: (e: string) => void,
  placeholder: string,
  input_type: string,
  id: string,
  type: string,
  error?: string
) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={input_type}>
        {input_type}
      </label>
      <input
        id={id}
        type={type}
        value={input}
        onChange={(e) => setFunction(e.target.value)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        placeholder={placeholder}
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
