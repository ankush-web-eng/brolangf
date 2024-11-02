'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from './ui/Themetoggle';
import Link from 'next/link';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Docs', href: '/docs', isNew: false },
        { name: 'Twitter', target: "_blank", href: 'https://x.com/whyankush07' },
        { name : 'Github', target: "_blank", href: 'https://github.com/ankush-web-eng/brolang' }
    ];

    return (
        <nav suppressHydrationWarning={true} className="fixed top-0 w-full bg-[#FDFDF9] dark:bg-[#060606] border-b border-gray-200 z-50 text-">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href={'/'} className="flex items-center">
                        <span className="text-xl font-bold">Brolang</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8 text-neutral-500 dark:text-neutral-300">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                target={item.target ? item.target : "_self"}
                                className="text-neutral-500 dark:text-neutral-300 hover:text-gray-900 relative"
                            >
                                {item.name}
                                {item.isNew && (
                                    <span className="absolute -top-1 -right-8 px-2 py-0.5 text-xs bg-emerald-100 text-emerald-800 rounded-full">
                                        new
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <div className="">
                            <ModeToggle />
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden py-4 space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg relative"
                            >
                                {item.name}
                                {item.isNew && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-emerald-100 text-emerald-800 rounded-full">
                                        new
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;