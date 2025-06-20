'use client';
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { LANGUAGES, DEFAULT_CODE_SNIPPETS } from "@/components/constants";
import CustomSelect from "@/components/CustomSelect";
import { useTheme } from "next-themes";

function App() {
    const [language, setLanguage] = useState("javascript");
    const [isDropdownCollapsed, setIsDropdownCollapsed] = useState(true);
    const [code, setCode] = useState(DEFAULT_CODE_SNIPPETS["javascript"]);
    const [output, setOutput] = useState("");
    const [stdin, setStdin] = useState("");
    const [loading, setLoading] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setCode(DEFAULT_CODE_SNIPPETS[language] || "");
    }, [language]);


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
            <header className="text-xl md:text-3xl font-bold text-center py-4 flex items-center justify-center">
                <div className="bg-gray-100 dark:bg-inherit dark:outline dark:outline-1 dark:outline-[#fff5] p-4 rounded-md text-gray-700 dark:text-white">
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
                className="block max-h-[60vh] md:flex px-4 md:px-1 md:flex-row gap-8"
                style={{ height: "calc(100vh - 160px)" }}>
                {/* Editor */}
                <div className="w-full md:w-1/2 h-full border border-gray-400 dark:border-[#fff8] rounded-md overflow-hidden shadow-lg">
                    <Editor
                        height="100%"
                        theme={theme === "dark" ? "vs-dark" : "vs-light"}
                        language={language}
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        options={{
                            fontSize: 16,
                        }}
                    />
                </div>

                {/* Input + Output */}
                <div className="w-full md:w-1/2 py-6 pb-12 md:p-0 md:h-[-webkit-fill-available]">
                    {/* Stdin */}
                    <div className="py-6 md:p-0 md:pb-6 h-[40%]">
                        <div className="py-6 flex-1 flex flex-col p-4 border border-gray-400 dark:border-[#fff8] 
                    rounded-md bg-white dark:bg-gray-800 shadow-lg">
                            <h2 className="font-semibold mb-2">Input (stdin)</h2>
                            <textarea
                                className="flex-1 w-full p-2 border border-gray-300 dark:border-[#fff1] rounded-md bg-gray-100 dark:bg-gray-900 dark:text-white resize-none overflow-auto min-h-0"
                                placeholder="Enter input data here..."
                                value={stdin}
                                onChange={(e) => setStdin(e.target.value)}
                            />
                        </div>
                    </div>


                    {/* Output */}
                    <div className="h-[60%]">
                        <div className="h-full flex-1 p-4 border border-gray-400 dark:border-[#fff8] rounded-md bg-white dark:bg-gray-800 overflow-auto max-h-[50vh] shadow-lg">
                            <h2 className="font-semibold mb-2">Output</h2>
                            <pre className="whitespace-pre-wrap">{output}</pre>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;
