import { LANGUAGES } from "@/components/constants";


interface customSelectProps {
    choicesList: string[],
    choiceSelected: string,
    onChange: (choice: string) => void,
    isDropdownCollapsed: boolean,
    setIsDropdownCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}


function CustomSelect(
    { choicesList, choiceSelected, onChange, isDropdownCollapsed, setIsDropdownCollapsed }:
        customSelectProps
) {
    return (
        <div
            className="w-32 md:w-36 relative flex justify-between items-center rounded-md
            px-3 md:px-4 py-2 md:py-3 cursor-pointer dark:border-[#fff5] bg-white dark:bg-[#202020]
            shadow-[1px_1px_5px_#0006] dark:shadow-[1px_1px_15px_#000] text-gray-600 dark:text-white
            text-sm sm:text-base"
            onClick={() => setIsDropdownCollapsed(prev => !prev)}
            id="language-select"
        >
            {choiceSelected.charAt(0).toUpperCase() + choiceSelected.slice(1)}

            <div
                className={`z-10 absolute w-[105%] left-0 top-[120%] bg-[#ffffff]
                        dark:border-[#fff2] rounded dark:bg-[#202020] shadow-[1px_1px_5px_#0006] 
                        text-gray-600 dark:text-white transition-all duration-1000 
                        ${isDropdownCollapsed ? "opacity-0 hidden" : "opacity-1 block"}`}
            >
                {choicesList.map((choice, index) => (
                    <div
                        className="cursor-pointer px-2 py-1 hover:bg-[#ececec] dark:hover:bg-gray-900"
                        key={choice}
                        onClick={() => onChange(choice)}
                        tabIndex={0}
                    >
                        {choice.charAt(0).toUpperCase() + choice.slice(1)}
                    </div>
                ))}
            </div>
            <svg
                className={`transition-all  w-2 h-2 text-gray-800 dark:text-white 
                ${isDropdownCollapsed ? "" : "rotate-180"}`
                }
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 8"
            >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
            </svg>
        </div>
    )
}


export default CustomSelect;