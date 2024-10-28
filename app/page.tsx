'use client';
import { CodeProvider } from '@/context/CodeContext';
import { CodeEditor } from '@/components/code/CodeEditor';
import { ResponsePanel } from '@/components/code/ResponsePanel';
import { SubmitButton } from '@/components/code/Submitbutton';

export default function CodePlaygroundPage() {
  return (
    <CodeProvider>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-4">Bhai++ Playground</h1>
              <p className="text-muted-foreground">
                Write and execute your Bhai++ code below.
              </p>
            </div>

            <div className="grid gap-6">
              <CodeEditor />
              <SubmitButton />
              <ResponsePanel />
            </div>
          </div>
        </main>
      </div>
    </CodeProvider>
  );
}