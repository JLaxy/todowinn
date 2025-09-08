"use client";

import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login
    console.log("Email:", email, "Password:", pass);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-30 text-center">
        Todowinn Project Mananger
      </h1>
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {GetInputFields(email, setEmail, "you@example.com", "Email")}
          {GetInputFields(pass, setPass, "********", "Password")}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
          >
            Login
          </button>
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
  input_type: string
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
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
