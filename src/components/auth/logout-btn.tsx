"use client";
import { signOut, useSession } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

const LogoutButton: React.FC = () => {
	const { data, status } = useSession();

	if (status === "unauthenticated") {
		return null;
	}

	const handleLogout = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<button
			type="button"
			onClick={handleLogout}
			className="btn btn-neutral btn-outline btn-sm mt-2 w-fit"
		>
			<BiLogOut />
			Logout
		</button>
	);
};

export default LogoutButton;
