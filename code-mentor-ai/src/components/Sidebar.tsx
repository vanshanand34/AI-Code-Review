'use client';
import React from "react";
import { Inter_Tight } from "next/font/google";
import { ThemeToggleButton } from "./ThemeToggle";
import Link from "next/link";


const interFont = Inter_Tight({
    variable: "--font-inter",
    subsets: ["latin"],
})


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
      className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} ${interFont.className}
      transition-[all] duration-[0.7s] ease-in-out fixed z-10  left-2 bottom-2 top-2 w-[100vw]`}
      onClick={handleClick}
    >
      <div
        className="min-h-full w-[65vw] sm:w-[45vw] lg:w-[35vw] 
       rounded-xl shadow-gray-600 dark:shadow-black shadow-lg
       bg-[#ffffff] dark:bg-[#1c1c1c]"
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
                    className="rounded-lg text-sm sm:text-base w-full px-4 py-4 
                                        hover:bg-[#e4e4e4] dark:hover:bg-[#29292969] cursor-pointer"
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

export default Sidebar;