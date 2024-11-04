'use client';
import { CodeState, CodeContextType } from '@/types/code';

import React, { createContext, useContext, useState } from 'react';
const CodeContext = createContext<CodeContextType | undefined>(undefined);

export function CodeProvider({ children }: { children: React.ReactNode }) {
    const [codeState, setCodeState] = useState<CodeState>({
        code: '',
        response: '',
        isLoading: false,
    });

    const setCode = (code: string) => {
        setCodeState(prev => ({ ...prev, code }));
    };

    const submitCode = async () => {
        try {
            setCodeState(prev => ({ ...prev, isLoading: true }));
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/compile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: codeState.code }),
            });

            const data = await response.json();
            setCodeState(prev => ({
                ...prev,
                response: data.error || data.result,
                isLoading: false,
            }));
        } catch (error) {
            setCodeState(prev => ({
                ...prev,
                response: 'Error executing code. Please try again.',
                isLoading: false,
            }));
            console.error(error);
        }
    };

    return (
        <CodeContext.Provider value={{ codeState, setCode, submitCode }}>
            {children}
        </CodeContext.Provider>
    );
}

export const useCode = () => {
    const context = useContext(CodeContext);
    if (!context) {
        throw new Error('useCode must be used within a CodeProvider');
    }
    return context;
};