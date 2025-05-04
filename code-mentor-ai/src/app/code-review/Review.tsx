'use client';

import { useState, FormEvent, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prism-themes/themes/prism-one-dark.css';

import ReviewResult from './components/ReviewResult';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';


export interface CodeReviewRequest {
  code: string;
  language: string;
  description: string;
}

export interface CodeReviewResponse {
  review: string;
  suggestions: string[];
  potentialBugs: string[];
  securityIssues: string[];
  refactoredCode: string;
}

export default function Home() {
  const [formData, setFormData] = useState<CodeReviewRequest>({
    code: '',
    language: 'javascript',
    description: '',
  });
  const [reviewResult, setReviewResult] = useState<CodeReviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const languages = ['javascript', 'python', 'java', 'typescript'];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReviewResult(null);

    if (!formData.code || !formData.description) {
      setError("Code And Description are required!!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch review');
      }

      const result = await response.json();
      const reviewData = result.data;
      const refactoredCode = reviewData.refactoredCode;
      if (refactoredCode.startsWith('```')) {
        reviewData.refactoredCode = refactoredCode.slice(3);
      }

      setReviewResult(reviewData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [reviewResult]);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="w-full p-2 sm:p-8 md:px-32">
        <h1
          className="text-2xl sm:text-4xl flex justify-center py-4 pb-8 
          font-bold text-gray-800 dark:text-white"
        >
          <div className='w-fit p-3 md:p-5 rounded-md bg-gray-100 dark:bg-gray-800 border border-[#00000022]' >
            Code Reviewer
          </div>
        </h1>

        <div className="flex items-center justify-center gap-x-6 auto-rows-[1fr] pb-8">
          <select
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            className="px-3 py-2 sm:p-3 text-sm sm:text-base rounded-md bg-gray-100 text-gray-800 border border-gray-300"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="typescript">TypeScript</option>
          </select>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Reviewing...' : 'Get Review'}
          </button>
        </div>

        <div className="">
          <div className="grid md:grid-cols-1 gap-y-4 md:gap-8 w-full">
            {/* Syntax-highlighted Code Editor */}
            <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg 
            border dark:border-[#ffffff88]'>
              <label
                className="block text-base sm:text-lg md:text-xl px-4 md:px-8 py-1 pt-3 md:pt-4 font-medium text-gray-700 mb-2 dark:text-white"
              >
                Code
              </label>
              <div className="grid text-white min-h-[70vh] w-full overflow-x-scroll">
                <Editor
                  value={formData.code}
                  onValueChange={(code) => setFormData({ ...formData, code })}
                  highlight={(code) =>
                    Prism.highlight(code, Prism.languages[formData.language], formData.language)
                  }
                  padding={16}
                  className={`focus:outline-0 outline-0 focus:border-0 focus:ring-0 rounded-b-md
                  text-xs sm:text-sm md:text-base font-mono min-h-[70vh] bg-gray-900 
                  language-${formData.language} overflow-auto w-fit`}
                  placeholder="Enter your code here..."
                />
              </div>
            </div>

            {/* Description Input */}
            <div className=''>
              <div className='shadow-lg bg-white rounded-lg dark:bg-gray-800 border dark:border-[#ffffff88]'>
                <label className="block px-2 md:px-8 py-3 md:pt-6 text-base sm:text-lg md:text-xl font-medium text-gray-700 dark:text-white">
                  Description
                </label>
                <div className="w-full ">
                  <div className='min-h-[200px] bg-gray-900 rounded-b-md'>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full h-full resize-none min-h-[200px] p-4 bg-gray-900 focus:outline-none focus:ring-0 focus:ring-blue-500 text-white text-xs sm:text-sm md:text-base"
                      placeholder="Enter a description of your code..."
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end items-center py-3 md:py-6 px-1'>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? 'Reviewing...' : 'Get Review'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8">
            <div className="bg-red-700 text-white rounded-md p-4 flex justify-between items-center">
              <p className='text-xs sm:text-sm md:text-base'>{error}</p>
              <span
                className='text-xl md:text-3xl cursor-pointer hover:text-gray-300'
                onClick={() => setError("")}
              >&times;</span>
            </div>
          </div>
        )}

        {/* Results */}
        <ReviewResult reviewResult={reviewResult} formData={formData} />

      </div>
    </div>
  );
}
