"use client";

import React from "react";
import "@/styles/ui/navbar.css";
import { authService } from "@/services/auth-service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTodowinnContext } from "@/contexts/todowinn-context";

const hamburgerSize = 30;

export default function Navbar() {
  const { setIsSidebarOpen, resetContext } = useTodowinnContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Send API Request
      const res = await authService.logout();

      if (res.status === 200) {
        toast.success("Logging out...");

        // Redirect
        setTimeout(() => {
          router.push("/login");
          resetContext();
        }, 1000);
      }
    } catch (error) {
      toast.error(`An error has occured while trying to log out!`);
      console.log(error);
      return;
    }
  };

  return (
    <div className="nav-div">
      <button className="cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
        <GiHamburgerMenu size={hamburgerSize} />
      </button>
      <h3 className="app-title">ToDowinn</h3>
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
