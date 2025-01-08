'use client';
import { compileCode, CompileResponse } from "@/compiler/handler";
import { useState } from "react";

export default function Page() {
    const [code, setCode] = useState<string>("");
    const [result, setResult] = useState<CompileResponse>({});

    const handleChange = () => {
        console.log(code);
        const resp = compileCode(code);
        console.log(resp);
        setResult(resp);
    };

    return (
        <div className="min-h-screen flex flex-col space-y-4 justify-center items-center">
            <input
                type="text"
                name="code"
                id="code"
                className="rounded-xl px-3 py-2 border-2 text-black bg-white"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button
                className="rounded-xl bg-black text-white p-3 hover:bg-slate-800 hover:text-gray-400"
                onClick={handleChange}
            >
                Submit
            </button>
            <p className={`${result.error ? 'text-red-500' : 'text-black'}`}>
                {result.result || result.error}
            </p>
        </div>
    );
}