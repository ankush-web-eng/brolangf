'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import DocumentationGrid from './docsComponents/DocsGrid';
import { documentationSections } from './docsComponents/CodeDocuments';
import PreferredLanguageSelector from '@/components/PreferredLanguageSelector';
import { useCode } from '@/context/CodeContext';
import { EnglishDocuments } from './docsComponents/EnglishDocuments';


export default function DocumentationPage() {

    const { prefLanguage } = useCode();

    return (
        <div className={cn(
            'min-h-screen font-satoshi antialiased',
            'bg-[#FDFDF9] dark:bg-[#060606]',
            'pt-32 pb-16'
        )}>
            <div className='px-3 md:px-12'><PreferredLanguageSelector /></div>
            {prefLanguage === 'hindi' ? <DocumentationGrid
                sections={documentationSections}
                columns={3}
            /> :
                <DocumentationGrid
                    sections={EnglishDocuments}
                    columns={3}
                />
            }
        </div>
    );
};
