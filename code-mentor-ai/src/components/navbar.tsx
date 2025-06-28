'use client';
import React from "react";
import { Geist } from "next/font/google";
import { ThemeToggleButton } from "./ThemeToggle";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";


const geistRegular = Geist({
  variable: "--font-geist-regular",
  subsets: ["latin"],
});


export default function Navbar() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent) {
    // event delegation
    const element = e.target as HTMLElement;
    if (element.closest("#sidebar-body") && element.id != "close-btn") {
      console.log(e.target);
      return;
    }
    setIsSidebarOpen(false);
  }


  return (
    <div
      className={`${geistRegular.className} z-10 fixed w-[100vw] flex justify-between 
            gap-2 p-1 pt-2 md:p-2 md:pt-3 bg-white dark:bg-[#0e0e0e] 
            shadow dark:border-b dark:border-b-[#ffffff17] text-black dark:text-white `}
    >
      <div
        className="font-bold uppercase text-2xl flex items-center p-2 px-4 cursor-pointer 
        font-sans text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
      >
        Code-Mentor
      </div>

      <div className="hidden md:flex items-center gap-4 lg:gap-12 pr-12 py-2">
        <Link href={"/"}>
          <NavBarComponent componentText="Home" isSelected={pathname === "/"} />
        </Link>
        <Link href={"/"}>
          <NavBarComponent componentText="About" isSelected={pathname == "/about"} />
        </Link>
        <Link href={"/code-review"}>
          <NavBarComponent componentText="Code Review" isSelected={pathname == "/code-review"} />
        </Link>
        <Link href={"/compiler"}>
          <NavBarComponent componentText="Compiler" isSelected={pathname == "/compiler"} />
        </Link>

        <ThemeToggleButton />

      </div>

      {/* toggle Sidebar icon */}
      <div
        onClick={() => setIsSidebarOpen(true)}
        className="pr-8 md:pr-12 py-2 text-3xl cursor-pointer md:hidden 
        hover:text-gray-700 dark:hover:text-gray-400 font-thin scale-x-125" >
        &#8801;
      </div>

      <Sidebar isSidebarOpen={isSidebarOpen} handleClick={handleClick} />
    </div>
  );
}

function NavBarComponent({ componentText, isSelected }: { componentText: string, isSelected: boolean }) {
  const selectedNav = "bg-gray-600 dark:bg-gray-200 dark:text-black text-white border-0";
  const unselectedNav = "hover:bg-gray-200 dark:hover:text-black";
  const styleToApply = isSelected ? selectedNav : unselectedNav;
  return (
    <div className={`p-2 px-3 border border-gray-300 dark:border-[#fff6] 
        rounded-md text-sm cursor-pointer text-nowrap ${styleToApply}`}>
      {componentText}
    </div>
  );
}
