'use client';
import { useCode } from '@/context/CodeContext';

export const ResponsePanel = () => {
  const { codeState } = useCode();
  const { response, isLoading } = codeState;

  return (
    <div className="mt-6 w-full">
      <h3 className="text-lg font-semibold mb-2">Output</h3>
      <div className="w-full h-[200px] border rounded-lg p-4 overflow-auto bg-muted">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : response ? (
          <pre className="font-mono text-sm whitespace-pre-wrap">{response}</pre>
        ) : (
          <p className="text-muted-foreground text-center">Run your code to see the output here</p>
        )}
      </div>
    </div>
  );
};