import React, { useEffect } from "react";

import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import { useTheme } from "next-themes";
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-typescript';

import "../../prism-light.css";
import "../../prism-dark.css";
import { CodeEditorProps } from "../Review";
import { codeSectionBodyStyle, codeSectionHeaderStyle } from "@/components/styleConstants";


function CodeEditor({ formData, setFormData }: CodeEditorProps) {

    const { systemTheme, theme, setTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    useEffect(() => setIsDarkMode(theme === 'dark'), [theme]);

    return (
        <div
            className={`overflow-clip shadow-[1px_1px_15px_#00000058] 
            rounded-lg scroll-mt-64 ${codeSectionBodyStyle}`}
            id="code-section"
            tabIndex={-1}>

            <label
                className={`block text-gray-700 pb-3 dark:text-gray-100 ${codeSectionHeaderStyle}`}
            >
                Code
            </label>

            <div className="grid grid-cols-1 text-white min-h-[70vh] max-w-full overflow-x-auto"
                style={{
                    scrollbarWidth: "thin"
                }}
            >
                <Editor
                    value={formData.code}
                    onValueChange={(code) => setFormData({ ...formData, code })}
                    highlight={(code) =>
                        Prism.highlight(code, Prism.languages[formData.language], formData.language)
                    }
                    padding={16}
                    className={`focus:outline-0 outline-0 focus:border-0 focus:ring-0 rounded-b-md
                    text-[13px]/[21px] sm:text-xs/5 md:text-[14px]/[22px]  font-mono min-h-[70vh] 
                    language-${formData.language} overflow-auto min-w-full w-max`}
                    placeholder="Enter your code here..."
                    style={{
                        color: isDarkMode ? 'white' : 'black',
                        fontFamily: "'Fira code', 'Fira Mono', monospace"
                    }}
                />
            </div>
        </div>
    )
}

export default CodeEditor;