'use client';
import { Editor } from '@monaco-editor/react';
import { useCode } from '@/context/CodeContext';
import { useTheme } from 'next-themes';

declare global {
  interface Window {
    monaco: typeof import('monaco-editor');
  }
}

export const CodeEditor = () => {
  const { codeState, setCode } = useCode();
  const { theme } = useTheme();

  const handleEditorMount = (editor: import('monaco-editor').editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    window.monaco = monaco;
    if (theme === 'dark') {
        fetch('/themes/Monokai.json')
          .then(data => data.json())
          .then(data => {
            monaco.editor.defineTheme('monokai', data);
            monaco.editor.setTheme('monokai');
            console.log(data);
          });
      } else {
        fetch('/themes/Dawn.json')
          .then(data => data.json())
          .then(data => {
            monaco.editor.defineTheme('monokai', data);
            monaco.editor.setTheme('monokai');
            console.log(data);
          });
      }
  };

  return (
    <div className="relative w-full h-[60vh] p-[2px] rounded-lg overflow-hidden before:content-[''] before:absolute before:inset-0 before:z-[-1] before:animate-pulse before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500">
      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          width="100%"
          defaultLanguage="javascript"
          value={codeState.code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorMount}
          options={{
            tabSize: 2,
            automaticLayout: true,
            formatOnType: true,
            minimap: { enabled: false },
          }}
          className="transition-colors duration-200"
        />
      </div>
    </div>
  );
};