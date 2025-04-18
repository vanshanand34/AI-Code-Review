'use client';

import { useState, FormEvent } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco, foundation } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeReviewRequest {
  code: string;
  language: string;
  description: string;
}

interface CodeReviewResponse {
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
      setReviewResult(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="w-full p-2 sm:p-8 md:px-32">
        <h1
          className="text-2xl sm:text-4xl flex justify-center py-4 pb-8 
          font-bold text-gray-800 dark:text-white"
        >
          <div className='w-fit p-3 md:p-5 rounded-md bg-gray-200 dark:bg-gray-800 shadow' >Code Reviewer</div>
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
          <div className="w-full grid md:grid-cols-1 gap-y-4 md:gap-8">
            {/* Syntax-highlighted Code Editor */}
            <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg border dark:border-[#ffffff88]'>
              <label
                className="block text-base sm:text-lg md:text-xl px-4 md:px-8 pt-4 md:pt-6 font-medium text-gray-700 mb-2 dark:text-white"
              >
                Code
              </label>
              <div className="rounded-md text-white min-h-[70vh] p-3 md:p-6">
                <Editor
                  value={formData.code}
                  onValueChange={(code) => setFormData({ ...formData, code })}
                  highlight={(code) =>
                    Prism.highlight(code, Prism.languages[formData.language], formData.language)
                  }
                  padding={16}
                  className="focus:outline-0 outline-0 focus:border-0 focus:ring-0 rounded-lg 
                  text-sm md:text-base font-mono min-h-[70vh] bg-gray-900"
                  placeholder="Enter your code here..."
                />
              </div>
            </div>

            {/* Description Input */}
            <div className='py-4'>
            <div className='shadow-lg bg-white dark:bg-gray-800 rounded-lg border dark:border-[#ffffff88]'>
              <label className="block px-4 md:px-8 py-2 pt-4 md:pt-6 text-base sm:text-lg md:text-xl font-medium text-gray-700 dark:text-white ">Description</label>
              <div className="p-3 md:p-6">
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full h-60 p-4 rounded-md bg-gray-900 focus:outline-none focus:ring-0 focus:ring-blue-500 text-white"
                  placeholder="Enter a description of your code..."
                  required
                />
              </div>


            </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end items-center py-3 md:py-6'>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Reviewing...' : 'Get Review'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8">
            <div className="bg-red-700 text-white rounded-md p-4 flex justify-between">
              <p>{error}</p>
              <span
                className='text-xl md:text-3xl cursor-pointer hover:text-gray-300'
                onClick={() => setError("")}  
              >&times;</span>
            </div>
          </div>
        )}

        {/* Results */}
        {reviewResult && (
          <div className="mt-8 bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-lg border">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Review Results</h2>

            <div className='p-2 px-4 py-6 d:py-8 rounded-lg dark:bg-gray-900'>

              <div className="pb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-white">Code Review</h3>
                <p className="text-gray-600 dark:text-gray-300">{reviewResult.review}</p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-white">Suggestions</h3>
                {reviewResult.suggestions.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {reviewResult.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No suggestions provided.</p>
                )}
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-white">Potential Bugs</h3>
                {reviewResult.potentialBugs.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {reviewResult.potentialBugs.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No potential bugs identified.</p>
                )}
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-white">Security Issues</h3>
                {reviewResult.securityIssues.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {reviewResult.securityIssues.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No security issues identified.</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-white">Refactored Code</h3>
                <div className='text-sm md:text-base text-gray-300'>
                  <SyntaxHighlighter
                    language={formData.language}
                    style={foundation}
                    customStyle={{
                      marginTop: '15px',
                      padding: '20px',
                      borderRadius: '5px',
                      backgroundColor: '#141414',
                      overflowX: 'auto',
                      maxWidth: '100%',
                    }}
                  >
                    {reviewResult.refactoredCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
