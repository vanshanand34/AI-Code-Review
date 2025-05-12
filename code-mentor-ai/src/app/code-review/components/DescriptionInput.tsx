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
import { CodeReviewRequest } from "../Review";
import { CodeEditorProps } from "../Review";
import { Code } from "lucide-react";



function CodeDescriptionInput({ formData, setFormData }: CodeEditorProps) {
    return (
        <div className=''>
            <div className='shadow-[1px_1px_15px_#00000058] rounded-lg 
            bg-white dark:bg-gray-800 border border-[#00000033] dark:border-[#ffffff2c]'>
                <label className="block px-3 md:px-6 py-3 md:pt-4 text-base sm:text-lg md:text-xl 
                font-medium text-gray-700 dark:text-white">
                    Description
                </label>
                <div className="w-full ">
                    <div className='min-h-[200px] bg-gray-900 rounded-b-md'>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full h-full resize-none min-h-[200px] p-4 bg-gray-900 
                            focus:outline-none focus:ring-0 focus:ring-blue-500 text-white 
                            text-xs sm:text-sm md:text-base"
                            placeholder="Enter a description of your code..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeDescriptionInput;