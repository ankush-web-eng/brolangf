import { preferredLanguage } from "@/context/CodeContext";

export interface CodeState {
    code: string;
    response: string;
    isLoading: boolean;
}

export interface CodeContextType {
    codeState: CodeState;
    prefLanguage: preferredLanguage;
    setPreflanguage: React.Dispatch<React.SetStateAction<preferredLanguage>>;
    setCode: (code: string) => void;
    submitCode: () => Promise<void>;
}