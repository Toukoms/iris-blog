import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function Header() {
  return (
    <header className="flex justify-between items-center px-12 py-4 container mx-auto shadow-md border border-primary/10 rounded-sm my-4">
      <p className="font-bold text-2xl md:text-3xl xl:text-4xl text-primary">
        IRIS-BLOG
      </p>
      <Button variant="ghost" className="w-fit h-fit p-2 cursor-pointer">
        <Search className="size-8" />
      </Button>
    </header>
  );
}

export default Header;
