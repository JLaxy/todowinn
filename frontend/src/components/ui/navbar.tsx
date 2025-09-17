"use client";

import React, { useEffect, useState } from "react";
import "@/styles/ui/navbar.css";
import { authService } from "@/services/auth-service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchLoggedInMember = async () => {
    setIsLoading(true);
    // Retrieve logged in member
    const userDetails = await authService.getLoggedInMember();
    setUserEmail(userDetails.email.split("@")[0]);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      // Send API Request
      const res = await authService.logout();

      if (res.status === 200) {
        toast.success("Logging out...");

        // Redirect
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(`An error has occured while trying to log out!`);
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    fetchLoggedInMember();
  }, []);

  return (
    <div className="nav-div">
      <h3 className="flex text-gray-700 font-bold items-center">
        Hi, {userEmail}!
      </h3>
      <LogoutButton handleLogout={handleLogout} />
    </div>
  );
}

type LogoutButtonProps = {
  handleLogout: () => Promise<void>;
};

function LogoutButton({ handleLogout }: LogoutButtonProps) {
  return (
    <button className="logout-btn font-bold text-white" onClick={handleLogout}>
      Logout
    </button>
  );
}
