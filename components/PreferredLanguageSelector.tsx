'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { preferredLanguage, useCode } from "@/context/CodeContext";

const languages: { id: preferredLanguage; label: string; flag: string }[] = [
    { id: 'english', label: 'English', flag: 'US' },
    { id: 'hindi', label: 'हिंदी', flag: 'IN' },
];

export default function PreferredLanguageSelector() {
    const { prefLanguage, setPreflanguage } = useCode();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectedLanguage = languages.find(lang => lang.id === prefLanguage) || languages[0];

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <div className="relative w-48">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-1 bg-[#FDFDF9] dark:bg-[#3e3e3e] border border-gray-200 dark:border-gray-700 
                rounded-lg shadow-sm flex items-center justify-between 
                hover:bg-gray-50 dark:hover:bg-[#4a4a4a] transition-colors duration-200"
            >
                <span className="flex items-center space-x-2">
                    <span className="text-xl">{selectedLanguage.flag}</span>
                    <span className="text-gray-700 dark:text-gray-200">{selectedLanguage.label}</span>
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        className="absolute w-full mt-2 bg-[#FDFDF9] dark:bg-[#3e3e3e] border border-gray-200 
                        dark:border-gray-700 rounded-lg shadow-lg z-10"
                    >
                        {languages.map((language) => (
                            <motion.button
                                key={language.id}
                                onClick={() => {
                                    setPreflanguage(language.id);
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-2 flex items-center justify-between 
                                hover:bg-gray-50 dark:hover:bg-[#4a4a4a] transition-colors duration-200
                                text-gray-700 dark:text-gray-200 first:rounded-t-lg last:rounded-b-lg"
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.4 }}
                            >
                                <span className="flex items-center space-x-2">
                                    <span className="text-xl">{language.flag}</span>
                                    <span>{language.label}</span>
                                </span>
                                {prefLanguage === language.id && (
                                    <Check className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}