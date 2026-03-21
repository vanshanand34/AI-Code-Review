import React from "react";
import { codeSectionBodyStyle, codeSectionHeaderStyle, BodyBg } from "@/components/styleConstants";

function InputSection(
    { stdin, setStdin }:
        { stdin: string, setStdin: (value: React.SetStateAction<string>) => void }
) {
    return (
        <div className={`py-4 md:p-0 md:pb-4 h-[25vh] md:h-[40%]`}>
            <div className={`flex-1 flex flex-col rounded-lg shadow-lg 
                            overflow-hidden h-full ${codeSectionBodyStyle}`}>
                <h2 className={`font-semibold ${codeSectionHeaderStyle} !text-[1rem]/[1.5rem]`}>Input (stdin)</h2>
                <textarea
                    className={`flex-1 w-full resize-none overflow-auto min-h-0 p-2 md:px-4 ${BodyBg}`}
                    placeholder="Enter input data here..."
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                />
            </div>
        </div>

    )
}

export default InputSection;