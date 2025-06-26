import React from "react";


function ErrorDisplay(
    { error, setError }:
        { error: string | null, setError: React.Dispatch<React.SetStateAction<string | null>> }
) {
    return (
        <div className={`flex justify-end pr-12 
            transition-[all] duration-[1s] ease-in-out
            top-[80%] fixed w-[100vw] right-0 ${error ? '' : 'translate-x-[150vw]'}`}
        >
            <div className="bg-red-700 text-white rounded-md p-4 flex justify-between items-center
            w-[60%]">
                <p className='text-xs sm:text-sm md:text-base'>{error}</p>
                <span
                    className='text-xl md:text-3xl cursor-pointer hover:text-gray-300'
                    onClick={() => setError("")}
                >&times;</span>
            </div>
        </div>
    )
}

export default ErrorDisplay;