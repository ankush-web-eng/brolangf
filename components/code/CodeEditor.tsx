'use client';
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { useCode } from '@/context/CodeContext';

declare global {
  interface Window {
    monaco: typeof import('monaco-editor');
  }
}

export const CodeEditor = () => {
  const { theme } = useTheme();
  const { codeState, setCode } = useCode();
  const dark = theme === 'dark';
  
  const editorTheme = {
    backgroundColor: dark ? '#1e1e1e' : '#a2d9ce',
    foregroundColor: dark ? '#d4d4d4' : '#000000',
  };

  const handleEditorMount = (editor: import('monaco-editor').editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    window.monaco = monaco;
    monaco.editor.defineTheme('bhai-theme', {
      base: dark ? 'vs-dark' : 'vs',
      inherit: true,
      rules: [
        { token: '', foreground: editorTheme.foregroundColor.replace('#', '') },
      ],
      colors: {
        'editor.background': editorTheme.backgroundColor,
        'editor.foreground': editorTheme.foregroundColor,
      },
    });
    monaco.editor.setTheme('bhai-theme');
  };

  return (
    <div className="w-full h-[60vh] border rounded-lg overflow-hidden">
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
  );
};