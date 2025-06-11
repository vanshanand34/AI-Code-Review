import React from "react";
import Link from "next/link";

export default function SectionNavigation() {
    return (
        <div className='hidden fixed left-8 top-64 lg:flex flex-col gap-y-8 text-black dark:text-white md:text-lg'>
            <Section sectionId="code-section" sectionName="Code" />
            <Section sectionId="description-section" sectionName="Description" />
            <Section sectionId="review-section" sectionName="Review" />
        </div>
    )
};

function Section({ sectionId, sectionName }: { sectionId: string, sectionName: string }) {

    return (
        <Link href={`#${sectionId}`} className='flex items-center gap-2' >
            <span className='w-4 h-0.5 border-b border-gray-400' />
            <div>{sectionName}</div>
        </Link>
    );
}