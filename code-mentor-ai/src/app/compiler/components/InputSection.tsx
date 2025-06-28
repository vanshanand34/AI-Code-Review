import React from "react";
import { codeSectionBodyStyle, codeSectionHeaderStyle, BodyBg } from "@/components/styleConstants";

function InputSection(
    { stdin, setStdin }:
        { stdin: string, setStdin: (value: React.SetStateAction<string>) => void }
) {
    return (
        <div className={`py-6 md:p-0 md:pb-4 h-[40%]`}>
            <div className={`flex-1 flex flex-col rounded-lg shadow-lg 
                            overflow-hidden h-full ${codeSectionBodyStyle}`}>
                <h2 className={`font-semibold ${codeSectionHeaderStyle}`}>Input (stdin)</h2>
                <textarea
                    className={`flex-1 w-full p-2 resize-none overflow-auto min-h-0 ${BodyBg}`}
                    placeholder="Enter input data here..."
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                />
            </div>
        </div>

    )
}

export default InputSection;