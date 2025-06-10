'use client';

import { useState, FormEvent, useEffect } from 'react';
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

import ReviewResult from './components/ReviewResult';
import GetReviewButton from './components/GetReviewButton';
import CustomSelect from '@/components/CustomSelect';
import CodeEditor from './components/CodeEditor';
import CodeDescriptionInput from './components/DescriptionInput';
import SectionNavigation from './components/SectionNavigation';


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

export interface CodeEditorProps {
  formData: CodeReviewRequest,
  setFormData: (React.Dispatch<React.SetStateAction<CodeReviewRequest>>)
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
  const [isDropdownCollapsed, setIsDropdownCollapsed] = useState(true);
  const languages = ['javascript', 'python', 'java', 'typescript', 'cpp', 'go', 'jsx', 'tsx'];

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
    <div className="min-h-screen pt-24 pb-12 dark:bg-[#101010] transition-all transition-discrete">
      <SectionNavigation />
      <div className="w-full p-2 sm:p-8 md:px-32 lg:px-52">
        <h1
          className="text-xl sm:text-2xl md:text-3xl flex justify-center py-4 pb-12 
          font-bold text-gray-800 dark:text-white text-center"
        >
          <div className='font-[sans-serif] w-fit p-3 md:p-5 md:px-32 rounded-md border-[#00000022]' >
            Paste Your Code Below for AI Review
          </div>
        </h1>

        <div className="flex items-center justify-center gap-x-6 auto-rows-[1fr] pb-8">

          <CustomSelect
            choicesList={languages}
            choiceSelected={formData.language}
            onChange={(choice) => setFormData({ ...formData, language: choice })}
            isDropdownCollapsed={isDropdownCollapsed}
            setIsDropdownCollapsed={setIsDropdownCollapsed}
          />

          <GetReviewButton handleSubmit={handleSubmit} loading={loading} />

        </div>

        <div className="" id='code-section'>
          <div className="grid md:grid-cols-1 gap-y-4 md:gap-8 md:gap-y-16 w-full">
            {/* Syntax-highlighted Code Editor */}
            <CodeEditor formData={formData} setFormData={setFormData} />

            {/* Description Input */}
            <CodeDescriptionInput formData={formData} setFormData={setFormData} />
          </div>
        </div>
        <div className='flex justify-end items-center py-3 md:py-6 px-1'>
          <GetReviewButton handleSubmit={handleSubmit} loading={loading} />
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
        <div id="review-section">
          <ReviewResult reviewResult={reviewResult} formData={formData} />
        </div>
      </div>
    </div>
  );
}
