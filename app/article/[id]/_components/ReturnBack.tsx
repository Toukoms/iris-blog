"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function ReturnBack({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex items-center w-fit gap-2 hover:cursor-pointer",
        className
      )}
    >
      <ArrowLeft size={20} className="text-primary font-bold" />
      <button
        className="link link-primary text-lg font-bold"
        onClick={() => router.back()}
      >
        Return Back
      </button>
    </div>
  );
}

export default ReturnBack;
