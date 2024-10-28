'use client';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useCode } from '@/context/CodeContext';

export const SubmitButton = () => {
  const { codeState, submitCode } = useCode();
  
  return (
    <Button
      onClick={submitCode}
      disabled={codeState.isLoading}
      className="mt-4"
    >
      <Play className="mr-2 h-4 w-4" />
      {codeState.isLoading ? 'Running...' : 'Run Code'}
    </Button>
  );
};