'use client';
import { Editor } from '@monaco-editor/react';

const CodeWriter = () => (
  <Editor
    height="50vh"
    width="50vw"
    defaultLanguage="javascript"
    defaultValue="// Sun bhai, yaha apna code likh"
    theme="vs-dark"
    options={{
      tabSize: 2,
      automaticLayout: true,
      formatOnType: true,
    }}
  />
);
export default CodeWriter;
