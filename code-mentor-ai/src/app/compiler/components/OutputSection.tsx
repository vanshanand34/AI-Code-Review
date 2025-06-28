import React from "react";
import { codeSectionBodyStyle, codeSectionHeaderStyle } from "@/components/styleConstants";


function Output({ output }: { output: string }) {
    return (
        <div className="h-[60%]">
            <div className={`h-full flex-1 rounded-md overflow-auto max-h-[50vh] shadow-lg
                             ${codeSectionBodyStyle}`}>
                <h2 className={`font-semibold ${codeSectionHeaderStyle}`}>Output</h2>
                <pre className={`whitespace-pre-wrap p-2 md:p-3`}>{output}</pre>
            </div>
        </div>

    )
}

export default Output;