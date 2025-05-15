"use client";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="btn btn-neutral btn-lg"
    >
      <BiLogOut />
      Logout
    </button>
  );
};

export default LogoutButton;
