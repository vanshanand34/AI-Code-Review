'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
// import 'prism-themes/themes/prism-vsc-dark-plus.css';
import { CodeReviewRequest, CodeReviewResponse } from '../Review';
import { Copy } from 'lucide-react';
import "../../globals.css";
import { BodyBg, codeSectionBodyStyle, codeSectionHeaderStyle } from '@/components/styleConstants';

const ReviewResultHeaderFontSize = "text-base md:text-lg font-medium";

const ReviewResult = (
    { reviewResult, formData }:
        { reviewResult: CodeReviewResponse | null, formData: CodeReviewRequest | null }
) => {

    const copyIconRef = useRef<HTMLDivElement>(null);

    function handleCopyCode(reviewResult: CodeReviewResponse) {
        window.navigator.clipboard.writeText(reviewResult.refactoredCode);
        copyIconRef.current?.classList.add('hover:text-green-500', 'scale-125', 'text-green-500');
        setTimeout(() => {
            copyIconRef.current?.classList.remove('hover:text-green-500', 'scale-125', 'text-green-500');
        }, 500);
    }

    return <>
        {reviewResult && (
            <>
                <div className={`mt-8 rounded-lg shadow-[1px_1px_15px_#00000048] overflow-clip ${codeSectionBodyStyle}`}>

                    <h2 className={`dark:text-white ${codeSectionHeaderStyle}`}>
                        Code Review Results
                    </h2>

                    <div className='p-4 px-2 md:px-4 pt-6 pb-3 rounded-lg '>

                        <div className="pb-6 px-2">

                            <h3 className={`${ReviewResultHeaderFontSize} text-gray-700 dark:text-white`}>
                                Overall Review
                            </h3>

                            <p
                                className="py-1 text-gray-600 dark:text-gray-300 
                                text-sm sm:text-base"
                            >
                                {reviewResult.review}
                            </p>
                        </div>

                        <div className="pb-6 px-2">

                            <h3 className={`${ReviewResultHeaderFontSize} text-gray-700 dark:text-white`}>
                                Suggestions
                            </h3>
                            <div className=' text-gray-600 dark:text-gray-300 text-sm sm:text-base'>
                                {
                                    reviewResult.suggestions.length > 0 ? (
                                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 
                                    text-xs sm:text-sm md:text-base">
                                            {reviewResult.suggestions.map((s, i) => (
                                                <li key={i} className='p-2'>{s}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600 dark:text-gray-300">
                                            No suggestions provided.
                                        </p>
                                    )
                                }
                            </div>
                        </div>

                        <div className="pb-6 px-2">

                            <h3 className={`${ReviewResultHeaderFontSize} text-gray-700 dark:text-white`}>
                                Potential Bugs
                            </h3>
                            <div className=' text-gray-600 dark:text-gray-300 text-sm sm:text-base'>
                                {
                                    reviewResult.potentialBugs.length > 0 ?
                                        (
                                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 
                                    text-xs sm:text-sm md:text-base">
                                                {reviewResult.potentialBugs.map((b, i) => (
                                                    <li key={i} className='p-2'>{b}</li>
                                                ))}
                                            </ul>
                                        ) :
                                        (
                                            <p className="text-gray-600 dark:text-gray-300">
                                                No potential bugs identified.
                                            </p>
                                        )
                                }
                            </div>
                        </div>

                        <div className="pb-6 px-2">

                            <h3 className={`${ReviewResultHeaderFontSize} text-gray-700 dark:text-white`}>
                                Security Issues
                            </h3>
                            <div className=' text-gray-600 dark:text-gray-300 text-sm sm:text-base'>
                                {
                                    reviewResult.securityIssues.length > 0 ?
                                        (
                                            <ul className="list-disc list-inside">
                                                {reviewResult.securityIssues.map((s, i) => (
                                                    <li key={i} className='p-2' >{s}</li>
                                                ))}
                                            </ul>
                                        ) :
                                        (
                                            <p className="text-gray-600 dark:text-gray-300">
                                                No security issues identified.
                                            </p>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`mt-8 rounded-lg shadow-[1px_1px_15px_#00000048] overflow-clip ${codeSectionBodyStyle}`}>
                    <div>
                        <div className={`flex justify-between items-center ${codeSectionHeaderStyle}`}>
                            <h3 className={`text-gray-700 dark:text-white `}>
                                Refactored Code
                            </h3>
                            <div
                                title='Copy Code'
                                ref={copyIconRef}
                                className='transition-all duration-75 delay-75 ease-in-out px-4 cursor-pointer hover:text-gray-700'
                            >
                                <Copy onClick={() => handleCopyCode(reviewResult)} xlinkTitle='Copy' />
                            </div>
                        </div>


                        <div className={`px-2 text-[13px]/[21px_!important] sm:text-xs/5 md:text-[14px]/[21px] text-gray-300 ${BodyBg}`}>
                            <pre className='line-numbers'
                                style={{
                                    marginTop: '0',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    overflowX: 'auto',
                                    maxWidth: '100%'
                                }}
                            >
                                <code
                                    className={`language-${formData?.language || 'javascript'} line-numbers 
                                        `}
                                >
                                    {reviewResult.refactoredCode}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </>
        )}

    </>

};
export default ReviewResult;