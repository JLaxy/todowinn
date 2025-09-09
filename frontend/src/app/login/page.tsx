"use client";

import { authService } from "@/services/auth-service";
import { AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Set loading
    setLoading(true);

    console.log("Email:", email, "Password:", pass);

    try {
      const res = await authService.login(email, pass);
      handleSuccessLogin(res);
    } catch (err) {
      handleError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  // execute if login is success
  const handleSuccessLogin = (res: AxiosResponse) => {
    if (res.status === 200) {
      setIsInvalid(false);
      toast.success("Logging in");

      setTimeout(() => {
        console.log("redirecting");
        router.push("/projects");
      }, 1000);
    }
  };

  // Handle error
  const handleError = (error: ApiError) => {
    if (error.statusCode == 401) {
      setIsInvalid(true);
      toast.error("Invalid credentials!");
      return;
    }

    // For other errors
    toast.error("An error has occured! Please try again");
    return;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-30 text-center">
        Todowinn Project Mananger
      </h1>
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {GetInputFields(
            email,
            setEmail,
            "you@example.com",
            "Email",
            isInvalid
          )}
          {GetInputFields(pass, setPass, "********", "Password", isInvalid)}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
            disabled={loading}
          >
            Login
          </button>
          <Toaster position="bottom-center" />
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
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
  error: boolean
) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={input_type}>
        {input_type}
      </label>
      <input
        id={input_type}
        type={input_type}
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
    </div>
  );
}
