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

import ReviewResult from './components/ReviewResult';
import GetReviewButton from './components/GetReviewButton';
import CustomSelect from '@/components/CustomSelect';
import CodeEditor from './components/CodeEditor';
import CodeDescriptionInput from './components/DescriptionInput';
import SectionNavigation from './components/SectionNavigation';
import ErrorDisplay from './components/Error';
import ParentLayout from '@/components/ParentLayout';


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

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest("#language-select") && !isDropdownCollapsed) {
      setIsDropdownCollapsed(true);
    }
  }

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
    <ParentLayout>
      <div
        className="pt-24 pb-12 px-2"
        onClick={handleClickOutside}
      >
        <SectionNavigation />
        <div className="w-full p-2 sm:p-8 md:px-32  lg:pl-60 lg:pr-24 xl:pl-72 xl:pr-44">
          <h1
            className="text-xl sm:text-2xl md:text-3xl flex justify-center py-4 pb-12 
          font-bold text-gray-800 dark:text-white text-center"
          >
            <div className='font-[sans-serif] w-fit px-8 p-3 md:p-5 md:px-32 rounded-md border-[#00000022]' >
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

          <div className="">
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
          <ErrorDisplay error={error} setError={setError} />

          {/* Results */}
          <div id="review-section" className='scroll-mt-24'>
            <ReviewResult reviewResult={reviewResult} formData={formData} />
          </div>
        </div>
      </div>
    </ParentLayout>
  );
}
