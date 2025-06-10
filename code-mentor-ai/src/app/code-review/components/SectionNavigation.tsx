import React from "react";
import Link from "next/link";

export default function SectionNavigation() {
    return (
        <div className='hidden fixed left-8 top-64 lg:flex flex-col gap-y-8 text-white text-md font-bold'>
            <Section sectionId="code-section" sectionName="Code" />
            <Section sectionId="description-section" sectionName="Description" />
            <Section sectionId="review-section" sectionName="Review" />
        </div>
    )
};

function Section({ sectionId, sectionName }: { sectionId: string, sectionName: string }) {

    return (
        <Link href={`#${sectionId}`} className='flex items-center gap-2' >
            <hr className='w-4 inline-block' />
            <div>{sectionName}</div>
        </Link>
    );
}