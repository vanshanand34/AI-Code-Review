import Image from "next/image";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import Review from "./Review";

export default function Home() {
  return (
    <>
      <div className="bg-white dark:bg-[#050505] min-h-screen">
        <Navbar />
        <div className="">
            <Review />
        </div>
      </div>
    </>
  );
}
