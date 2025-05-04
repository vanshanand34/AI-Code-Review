'use client';

import { useState, FormEvent, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prism-themes/themes/prism-one-dark.css';
import { CodeReviewRequest, CodeReviewResponse } from '../Review';

const ReviewResult = (
    { reviewResult, formData }:
        { reviewResult: CodeReviewResponse | null, formData: CodeReviewRequest | null }
) => {
    return <>
        {reviewResult && (
            <div className="mt-8 bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-lg 
            border border-[#00000015] dark:border-[#fff7]">

                <h2 className="text-2xl text-center font-bold text-gray-800 dark:text-white mb-6">
                    Code Review Results
                </h2>

                <div className='py-6 d:py-8 rounded-lg '>

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
                        <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                            Refactored Code
                        </h3>

                        <div className='text-xs sm:text-sm md:text-base text-gray-300'>
                            <pre className='line-numbers'
                                style={{
                                    marginTop: '15px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    // backgroundColor: '#111827',
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