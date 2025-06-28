'use client';
import { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import axios from "axios";
import { LANGUAGES, DEFAULT_CODE_SNIPPETS } from "@/components/constants";
import CustomSelect from "@/components/CustomSelect";
import { useTheme } from "next-themes";
import { BodyBg, codeSectionBodyStyle, codeSectionFont, codeSectionHeaderStyle } from "@/components/styleConstants";
import Output from "./components/OutputSection";
import InputSection from "./components/InputSection";
import EditorSection from "./components/Editor";

function App() {
    const [language, setLanguage] = useState("javascript");
    const [isDropdownCollapsed, setIsDropdownCollapsed] = useState(true);
    const [code, setCode] = useState(DEFAULT_CODE_SNIPPETS["javascript"]);
    const [output, setOutput] = useState("");
    const [stdin, setStdin] = useState("");
    const [loading, setLoading] = useState(false);
    const [fontSize, setFontSize] = useState(getResponsiveFontSize());
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setCode(DEFAULT_CODE_SNIPPETS[language] || "");
    }, [language]);

    function getResponsiveFontSize() {
        if (typeof window == "undefined") return 16;
        const width = window.innerWidth;
        if (width < 500) return 13;
        if (width < 800) return 14;
        if (width < 1200) return 15;
        return 16;
    }

    const monaco = useMonaco();

    const htmlDefaults = monaco?.languages.html.htmlDefaults
    htmlDefaults?.setModeConfiguration({
        ...htmlDefaults.modeConfiguration,
        documentFormattingEdits: false,
        documentRangeFormattingEdits: false,
    })

    const handleRun = async () => {
        setLoading(true);

        try {
            const { data } = await axios.post("https://emkc.org/api/v2/piston/execute", {
                language,
                files: [{ content: code }],
                stdin,
                version: LANGUAGES[language],
            });

            setOutput(data?.run?.output || "");
        } catch {
            setOutput("Error running code");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 text-gray-900 dark:text-white p-4 md:px-12 space-y-4 pb-12">
            <header className="text-xl md:text-3xl lg:text-4xl font-bold text-center py-4 flex items-center justify-center">
                <div className="p-4 rounded-md text-gray-700 dark:text-white">
                    Code Compiler
                </div>
            </header>

            <div className="flex justify-center gap-4 py-4">

                <CustomSelect
                    choicesList={Object.keys(LANGUAGES)}
                    choiceSelected={language}
                    onChange={(choice) => setLanguage(choice)}
                    isDropdownCollapsed={isDropdownCollapsed}
                    setIsDropdownCollapsed={setIsDropdownCollapsed}
                />

                <button
                    className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                    cursor-pointer flex items-center justify-center md:gap-2 shadow"
                    onClick={handleRun}
                    disabled={loading}
                >
                    {loading && (
                        <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4">
                            </circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    <span>{loading ? 'Running...' : 'Run Code'}</span>
                </button>


            </div>

            <div
                className="block max-h-[60vh] md:flex px-4 md:px-1 md:flex-row gap-8 h-[calc(100vh-140px)]">
                {/* Editor */}
                <EditorSection theme={theme} code={code} setCode={setCode} language={language} fontSize={fontSize} />

                {/* Input + Output */}
                <div className={`w-full md:w-1/2 py-6 pb-12 md:p-0 
                    md:h-[-webkit-fill-available]`}>

                    <InputSection stdin={stdin} setStdin={setStdin} />

                    <Output output={output} />

                </div>
            </div>
        </div>
    );
}

export default App;
