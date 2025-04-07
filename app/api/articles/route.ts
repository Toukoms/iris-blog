import articles from "@/mocks/articles.json";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(articles);
}
