import React from "react";

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-typescript';

import { CodeEditorProps } from "../Review";
import { BodyBg, codeSectionBodyStyle, codeSectionHeaderStyle } from "@/components/styleConstants";


function CodeDescriptionInput({ formData, setFormData }: CodeEditorProps) {
    return (
        <div
            className={`overflow-clip scroll-mt-24 shadow-[1px_1px_15px_#00000058] 
                rounded-lg  ${codeSectionBodyStyle}`} id="description-section"
        >
            <label className={`block text-gray-700 dark:text-white ${codeSectionHeaderStyle}`}>
                Description
            </label>
            <div className="w-full ">
                <div className='min-h-[200px]  rounded-b-md bg-[#f4f4f4] dark:bg-[#202020]'>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={`w-full h-full resize-none min-h-[200px] p-4
                            focus:outline-none focus:ring-0 focus:ring-blue-500
                            text-xs sm:text-sm md:text-base ${BodyBg}`}
                        placeholder="Enter a description of your code..."
                        required
                    />
                </div>
            </div>
        </div>
    );
}

export default CodeDescriptionInput;