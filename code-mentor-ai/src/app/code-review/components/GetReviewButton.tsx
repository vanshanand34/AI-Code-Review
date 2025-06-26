
import React from 'react';

function GetReviewButton(
    { handleSubmit, loading }:
        { handleSubmit: (e: React.FormEvent) => void, loading: boolean }
) {
    return (
        <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 
            disabled:opacity-50 text-sm md:text-base font-medium"
        >
            {loading ?
                <span className='flex justify-between items-center gap-2'>
                    <span className=''>
                        <svg
                            className="size-4 border-r-2 border-r-white rounded-r-full animate-spin ..."
                            viewBox="0 0 24 24">
                        </svg>
                    </span>
                    Reviewing
                </span>
                : 'Get Review'
            }
        </button>
    );
}

export default GetReviewButton;