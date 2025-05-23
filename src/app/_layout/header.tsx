import LoginButton from "@/components/auth/login-btn";
import { auth } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";

async function Header() {
	const session = await auth();
	const authenticated = session?.user !== undefined;

	return (
		<header className="container mx-auto flex items-center justify-between border-gray-300/40 border-b p-4 pb-6">
			<Link href={"/"} className="font-bold text-2xl">
				IRIS BLOG
			</Link>
			{authenticated ? (
				<nav className="flex items-center gap-4">
					<Link href={"/"} className="text-accent text-lg hover:underline">
						Articles
					</Link>
					<Link
						className="flex justify-end"
						href={`/profile/${session?.user.id}`}
					>
						<div className="flex h-10 items-center gap-2 rounded-full bg-gray-300/20 p-2 pl-4">
							<span>{session?.user.name}</span>
							{session?.user.image ? (
								<Image
									src={session?.user.image}
									alt="User Avatar"
									className="h-8 w-8 rounded-full"
									width={640}
									height={640}
								/>
							) : (
								<div className="h-8 w-8">
									<span>{session.user.name?.slice(0, 2)}</span>
								</div>
							)}
						</div>
					</Link>
				</nav>
			) : (
				<LoginButton />
			)}
		</header>
	);
}

export default Header;
