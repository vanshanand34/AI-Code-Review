import React from "react";

import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-typescript';
import 'prism-themes/themes/prism-one-dark.css';
import { CodeEditorProps } from "../Review";



function CodeEditor({ formData, setFormData }: CodeEditorProps) {
    return (
        <div className='bg-white dark:bg-gray-800 shadow-[1px_1px_15px_#00000058] rounded-lg 
            border border-[#00000033] dark:border-[#ffffff2c]'>
            <label
                className="block text-base sm:text-lg md:text-xl px-4 md:px-6 py-1 pt-3 md:pt-4 font-medium text-gray-700 mb-2 dark:text-gray-100"
            >
                Code
            </label>
            <div className="grid grid-cols-1 text-white min-h-[70vh] max-w-full overflow-x-auto
            " style={{
                    scrollbarWidth: "thin"
                }}>
                <Editor
                    value={formData.code}
                    onValueChange={(code) => setFormData({ ...formData, code })}
                    highlight={(code) =>
                        Prism.highlight(code, Prism.languages[formData.language], formData.language)
                    }
                    padding={16}
                    className={`focus:outline-0 outline-0 focus:border-0 focus:ring-0 rounded-b-md
                  text-xs sm:text-sm md:text-sm font-mono min-h-[70vh] bg-gray-900 
                  language-${formData.language} overflow-auto min-w-full w-max`}
                    placeholder="Enter your code here..."
                />
            </div>
        </div>
    )
}

export default CodeEditor;