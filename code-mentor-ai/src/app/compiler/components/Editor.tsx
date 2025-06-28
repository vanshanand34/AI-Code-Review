import React from "react";
import { Editor } from "@monaco-editor/react";
import { codeSectionBodyStyle, codeSectionHeaderStyle, codeSectionFont } from "@/components/styleConstants";

function EditorSection(
    { theme, code, setCode, language, fontSize }:
        {
            theme: string | undefined,
            code: string,
            setCode: (value: React.SetStateAction<string>) => void,
            language: string,
            fontSize: number
        }
) {
    return (
        <div className={`${codeSectionFont} w-full md:w-1/2 h-full rounded-lg overflow-hidden shadow-lg
                    dark:shadow-[#1d1d1dab] border dark:border-[#242424]`}>
            <Editor
                height="100%"
                theme={theme === "dark" ? "vs-dark" : "vs-light"}
                language={language}
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                    minimap: { enabled: false },
                    fontSize: fontSize
                }}
                className={`${codeSectionFont}`}
            />
        </div>
    )
}

export default EditorSection;