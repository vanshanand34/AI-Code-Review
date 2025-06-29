import React from "react";
import { codeSectionBodyStyle, codeSectionHeaderStyle } from "@/components/styleConstants";


function Output({ output }: { output: string }) {
    return (
        <div className="h-[20vh] md:h-[60%]">
            <div className={`h-full flex-1 rounded-lg overflow-auto shadow-lg
                             ${codeSectionBodyStyle}`}>
                <h2 className={`font-semibold ${codeSectionHeaderStyle} !text-[1rem]/[1.5rem]`}>Output</h2>
                <pre className={`whitespace-pre-wrap p-2 md:p-3 h-max`}>{output}</pre>
            </div>
        </div>

    )
}

export default Output;