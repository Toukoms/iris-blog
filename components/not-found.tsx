import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-6xl font-bold">404 - Not Found</h1>
      <Link
        href="/"
        className="mt-4 text-center text-xl text-blue-600 hover:underline"
      >
        Go back home
      </Link>
    </div>
  );
}
