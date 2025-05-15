import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="dark:bg-[#050505] bg-white min-h-screen">
      <Navbar />
      <div className="pt-48 px-4 sm:px-18 md:px-32">

        <div className="p-2 lg:pr-[8vw] xl:pr-[15vw] text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
          Smarter Code Reviews, Powered by AI
        </div>

        <div className="py-6 p-2 pr-[15vw] text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-white">
          Catch bugs, improve quality, and ship faster with intelligent, automated code review.
        </div>

        <div className="pl-2">
          <Link href="/code-review">
            <button className="border border-[#00000069] dark:border-[#fff6] dark:text-white 
            p-2 px-4 rounded hover:bg-gray-300 hover:border-gray-300 dark:hover:bg-[#2d2d2d] dark:hover:border-[#2d2d2d]">
              Review Code
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
