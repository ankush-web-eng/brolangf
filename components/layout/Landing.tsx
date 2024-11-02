'use client';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import GridPattern from '../ui/grid-pattern';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";

export default function LandingPage() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen w-full bg-[#FDFDF9] dark:bg-[#060606] transition-all duration-300 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
        >
            <div className="container mx-auto px-4">
                <section className="pt-32 pb-16 text-center relative">
                    <div className="absolute inset-0 -z-10">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.5 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/30 dark:to-purple-950/30 blur-3xl opacity-50" 
                        />
                    </div>

                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 mb-8 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]"
                    >
                        <span className="text-sm">✨ Introducing Brolang</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-6xl sm:text-7xl font-bold tracking-tight mb-8"
                    >
                        <span className="bg-clip-text drop-shadow-2xl text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                            Programming Language
                        </span>
                        <br />
                        <span className="text-gray-900 dark:text-gray-100">
                            for all Brothers
                        </span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
                    >
                        Programming language written in <span className='italic bg-teal-400 text-white'>Golang</span>
                        which aims to make programming fun.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href={'/docs'}>
                            <Button 
                                size="lg" 
                                className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
                            >
                                Browse Documentation
                            </Button>
                        </Link>
                        <Link href={'/playground'}>
                            <Button 
                                size="lg" 
                                className='shadow-2xl shadow-blue-500/20' 
                                variant="outline"
                            >
                                Go to Playground
                            </Button>
                        </Link>
                    </motion.div>
                </section>

                <GridPattern
                    width={30}
                    height={30}
                    x={-1}
                    y={-1}
                    strokeDasharray={"24 2"}
                    className={cn(
                        "absolute inset-0 h-full w-full",
                        "text-gray-300 dark:text-gray-700 opacity-30"
                    )}
                />
            </div>
        </motion.div>
    );
};
