'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prism-themes/themes/prism-one-dark.css';
import { CodeReviewRequest, CodeReviewResponse } from '../Review';
import { Copy } from 'lucide-react';

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
            <div className="mt-8 bg-white dark:bg-gray-900 rounded-lg shadow-[1px_1px_15px_#00000048] 
            border border-[#00000015] dark:border-[#fff7] overflow-clip">

                <h2 className="border-b dark:border-0 dark:bg-gray-800 text-2xl font-bold text-gray-800 dark:text-white 
                    py-4 md:py-4 px-4 md:px-6">
                    Code Review Results
                </h2>

                <div className='p-4 md:p-6 py-6 d:py-8 rounded-lg '>

                    <div className="pb-6 px-2">

                        <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                            Code Review
                        </h3>

                        <p className="py-1 text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">{reviewResult.review}</p>
                    </div>

                    <div className="pb-6 px-2">

                        <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                            Suggestions
                        </h3>

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

                    <div className="pb-6">

                        <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                            Potential Bugs
                        </h3>

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

                    <div className="pb-6">

                        <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                            Security Issues
                        </h3>

                        {
                            reviewResult.securityIssues.length > 0 ?
                                (
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 
                                    text-xs sm:text-sm md:text-base">
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

                    <div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                                Refactored Code
                            </h3>
                            <div
                                ref={copyIconRef}
                                className='transition-all duration-75 delay-75 ease-in-out px-4 cursor-pointer hover:text-gray-700'
                            >
                                <Copy onClick={() => handleCopyCode(reviewResult)} />
                            </div>
                        </div>


                        <div className='text-xs sm:text-sm md:text-base text-gray-300'>
                            <pre className='line-numbers'
                                style={{
                                    marginTop: '15px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    overflowX: 'auto',
                                    maxWidth: '100%'
                                }}
                            >
                                <code
                                    className={`language-${formData?.language || 'javascript'} line-numbers 
                                        text-xs sm:text-sm md:text-base`}
                                >
                                    {reviewResult.refactoredCode}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        )}

    </>

};
export default ReviewResult;