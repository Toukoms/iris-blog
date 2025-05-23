"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

function LoginButton() {
  return (
    <button
      type="button"
      className="btn btn-primary btn-outline"
      onClick={() => signIn("github")}
    >
      <FaGithub /> <span>Login</span>
    </button>
  );
}

export default LoginButton;
