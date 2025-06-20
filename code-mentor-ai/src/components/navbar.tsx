'use client';
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeToggleButton } from "./ThemeToggle";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className="pr-8 md:pr-12 py-2 text-4xl cursor-pointer md:hidden 
        hover:text-gray-700 dark:hover:text-gray-400 font-thin" >
        &#8801;
      </div>

      <Sidebar isSidebarOpen={isSidebarOpen} handleClick={handleClick} />
    </div>
  );
}

function NavBarComponent({ componentText, isSelected }: { componentText: string, isSelected: boolean }) {
  const selectedNav = "bg-gray-500 dark:bg-gray-200 dark:text-black text-white border-0";
  const unselectedNav = "hover:bg-gray-200 dark:hover:text-black";
  const styleToApply = isSelected ? selectedNav : unselectedNav;
  return (
    <div className={`p-2 px-3 border border-gray-300 dark:border-[#fff6] 
        rounded-md text-sm cursor-pointer text-nowrap ${styleToApply}`}>
      {componentText}
    </div>
  );
}


function Sidebar(
  { isSidebarOpen, handleClick }:
    {
      isSidebarOpen: boolean,
      handleClick: (e: React.MouseEvent) => void
    }
) {

  const components = [
    { componentText: "Home", path: "/" },
    { componentText: "About", path: "/" },
    { componentText: "Code Review", path: "/code-review" },
    { componentText: "Compiler", path: "/compiler" }
  ];


  return (
    <div
      className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-[all] duration-[0.7s] ease-in-out fixed z-10 top-0 left-0 min-h-screen w-[100vw]`}
      onClick={handleClick}
    >
      <div
        className="min-h-screen w-[55vw] xs:w-[45vw] sm:w-[35vw] lg:w-[30vw] 
       shadow-gray-600 dark:shadow-black shadow-lg
       bg-[#f0f0f0] dark:bg-[#141414]"
        id="sidebar-body"
      >

        <div
          className="p-4 py-2.5 text-2xl font-bold flex justify-between items-center cursor-pointer
                    text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 pr-8
                    border-b-2 border-gray-300 dark:border-[#fff6]"
        >
          <ThemeToggleButton />
          <div id="close-btn" >
            &times;
          </div>
        </div>

        <div className="p-4 uppercase font-semibold text-gray-800 dark:text-white">
          {
            components.map(
              (component, index) => (
                <Link
                  href={component.path}
                  key={index}
                >
                  <div
                    className="text-sm sm:text-base w-full px-4 py-4 
                                        hover:bg-[#e4e4e4] dark:hover:bg-[#00000069] cursor-pointer"
                  >
                    {component.componentText}
                  </div>
                </Link>
              )
            )
          }
        </div>

      </div>
    </div>
  );
}