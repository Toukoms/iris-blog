import { auth } from "@/server/auth";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";

export default  async function CreateArticleButton() {
    const session = await auth();
    const authenticated = session?.user !== undefined;
  
    if (!authenticated) {
      return null;
    }
  
  return (
    <Link href={"/article/new"} className="btn flex items-center gap-2 no-underline">
      <BiPlus size={18} />
      <span>Create Article</span>
    </Link>
  );
}
