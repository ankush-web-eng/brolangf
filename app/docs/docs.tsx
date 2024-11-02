'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeSnippet {
    title: string;
    description?: string;
    code: string;
    language: string;
}

interface CodeBlockProps {
    code: string;
    language: string;
    className?: string;
}

interface DocSectionProps extends CodeSnippet {
    className?: string;
}

interface DocumentationGridProps {
    sections: CodeSnippet[];
    columns?: 1 | 2 | 3;
    className?: string;
}

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        }
    }
};

const expandCollapse = {
    collapsed: {
        height: 160,
        transition: {
            duration: 0.4,
            ease: 'easeInOut'
        }
    },
    expanded: {
        height: 'auto',
        transition: {
            duration: 0.4,
            ease: 'easeInOut'
        }
    }
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, className }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { toast } = useToast();

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(code.trim())
            .then(() => {
                toast({
                    title: "Copied to clipboard",
                    description: "Code snippet has been copied",
                });
            })
            .catch(() => {
                toast({
                    title: "Error",
                    description: "Failed to copy content",
                    variant: "destructive",
                });
            });
    };

    return (
        <Card className={cn(
            "border border-[#E2E2E2] dark:border-[#4a4a4a] overflow-hidden",
            className
        )}>
            <CardContent className="relative p-4">
                <motion.div
                    initial="collapsed"
                    animate={isExpanded ? "expanded" : "collapsed"}
                    variants={expandCollapse}
                    className="overflow-hidden"
                >
                    <pre className={cn(
                        "bg-[#1F2937] dark:bg-[#2D2D2D] p-4 rounded-lg overflow-x-auto text-sm",
                        "text-[#E5E7EB] font-mono leading-relaxed"
                    )}>
                        <code className={`language-${language}`}>{code.trim()}</code>
                    </pre>
                </motion.div>

                <motion.div
                    className="absolute top-3 right-3 flex space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-[#F3F3F0] dark:hover:bg-[#4a4a4a] rounded-lg"
                            onClick={handleCopyToClipboard}
                        >
                            <CopyIcon className="h-4 w-4" />
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-[#F3F3F0] dark:hover:bg-[#4a4a4a] rounded-lg"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isExpanded ? (
                                    <ChevronUpIcon className="h-4 w-4" />
                                ) : (
                                    <ChevronDownIcon className="h-4 w-4" />
                                )}
                            </motion.div>
                        </Button>
                    </motion.div>
                </motion.div>

                <AnimatePresence>
                    {!isExpanded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#FDFDF9] dark:from-[#3e3e3e] to-transparent pointer-events-none"
                        />
                    )}
                </AnimatePresence>
            </CardContent>

            <AnimatePresence>
                {!isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Button
                            variant="ghost"
                            className="w-full text-sm hover:bg-[#F3F3F0] dark:hover:bg-[#4a4a4a]"
                            onClick={() => setIsExpanded(true)}
                        >
                            Show more
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};

const DocSection: React.FC<DocSectionProps> = ({
    title,
    description,
    code,
    language,
    className
}) => {
    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className={cn("h-full", className)}
        >
            <h2 className="text-xl font-bold mb-2 text-[#1F2937] dark:text-[#E5E7EB]">
                {title}
            </h2>
            {description && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#4B5563] dark:text-[#9CA3AF] mb-4 text-sm"
                >
                    {description}
                </motion.p>
            )}
            <CodeBlock code={code} language={language} />
        </motion.div>
    );
};

const DocumentationGrid: React.FC<DocumentationGridProps> = ({
    sections,
    columns = 2,
    className
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
                'w-full max-w-[1400px] mx-auto p-4 font-satoshi',
                className
            )}
        >
            <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        html {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

            <motion.div
                className={cn(
                    'grid gap-6',
                    {
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
                        'grid-cols-1 md:grid-cols-2': columns === 2,
                        'grid-cols-1': columns === 1
                    }
                )}
            >
                {sections.map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1 // Stagger effect
                        }}
                    >
                        <DocSection
                            title={section.title}
                            description={section.description}
                            code={section.code}
                            language={section.language}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

const DocumentationPage = () => {
    const documentationSections: CodeSnippet[] = [
        {
            title: "File Upload",
            description: "Upload files using FormData and axios",
            code: `const uploadFile = async (file: File) => {
  if (!file) {
    setError('No file selected');
    return;
  }
  
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await axios.post(
      'https://api.example.com/upload',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
          "API_KEY": process.env.API_KEY
        }
      }
    );
    
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<string>;
    throw new Error(axiosError.response?.data);
  }
}`,
            language: "typescript"
        },
    ];

    return (
        <div className={cn(
            'min-h-screen font-satoshi antialiased',
            'bg-[#FDFDF9] dark:bg-[#060606]',
            'pt-32 pb-16'
        )}>
            <DocumentationGrid
                sections={documentationSections}
                columns={3}
            />
        </div>
    );
};

export default DocumentationPage;