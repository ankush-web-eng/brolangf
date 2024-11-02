'use client';

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/Themetoggle";

const Tab = ({
	children,
	setPosition,
	isMobile = false
}: {
	children: React.ReactNode;
	setPosition: ({
		left,
		width,
		opacity,
	}: {
		left: number;
		width: number;
		opacity: number;
	}) => void;
	isMobile?: boolean;
}) => {
	const ref = useRef<HTMLLIElement>(null);

	return (
		<li
			ref={ref}
			onMouseEnter={() => {
				if (!ref?.current || isMobile) return;
				const { width } = ref.current.getBoundingClientRect();
				setPosition({
					left: ref.current.offsetLeft,
					width,
					opacity: 1,
				});
			}}
			className={`relative z-10 transition-colors duration-200 
        ${isMobile
					? 'py-4 px-4 text-base border-b border-gray-100 dark:border-gray-800'
					: 'py-2.5 px-3 text-xs md:py-2 md:px-5 md:text-base'
				} 
        text-gray-800 dark:text-gray-200 cursor-pointer hover:text-gray-900 dark:hover:text-white`}
		>
			{children}
		</li>
	);
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
	return (
		<motion.li
			animate={position}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
			className="absolute z-0 h-7 bg-gray-200/30 dark:bg-gray-700/30 rounded-full md:h-10 shadow-md backdrop-blur-sm"
		/>
	);
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NavContent = ({ isMobile = false, setMobileMenuOpen = (open: boolean) => { } }) => {
	const [position, setPosition] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	});

	return (
		<ul
			onMouseLeave={() => {
				if (!isMobile) {
					setPosition((pv) => ({
						...pv,
						opacity: 0,
					}));
				}
			}}
			className={`relative flex ${isMobile ? 'flex-col' : 'items-center'} 
        ${isMobile
					? 'bg-white dark:bg-gray-900 p-4 space-y-2'
					: 'py-3 px-5 mx-auto bg-white/10 dark:bg-black/20 rounded-full border-2 border-gray-200/20 dark:border-gray-700/20'} 
        shadow-lg backdrop-blur-md`}
		>
			<Tab setPosition={setPosition} isMobile={isMobile}>
				<Link
					className="w-full h-full block"
					href="/playground"
					onClick={() => isMobile && setMobileMenuOpen(false)}
				>
					Playground
				</Link>
			</Tab>
			<Tab setPosition={setPosition} isMobile={isMobile}>
				<Link
					className="w-full h-full block"
					href="/docs"
					onClick={() => isMobile && setMobileMenuOpen(false)}
				>
					Docs
				</Link>
			</Tab>
			<Tab setPosition={setPosition} isMobile={isMobile}>
				<ModeToggle />
			</Tab>

			<Link
				href="https://github.com/ankush-web-eng/bhaiplusplus"
				target="_blank"
				onClick={() => isMobile && setMobileMenuOpen(false)}
				className={`inline-flex gap-x-2 justify-start items-start py-3 px-5 
          ${isMobile ? 'mt-4 w-full' : 'ml-3'} 
          rounded-3xl border duration-200 sm:w-auto group 
          bg-black dark:bg-white border-gray-700/30 dark:border-gray-300/20 
          text-md font-geistSans text-gray-200 dark:text-black 
          hover:bg-gray-700/60 dark:hover:bg-gray-100/20 
          hover:text-white dark:hover:text-gray-100`}
			>
				Github
				<div className="flex overflow-hidden relative justify-center items-center ml-1 w-5 h-5">
					<ArrowUpRight className="absolute transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-5" />
					<ArrowUpRight className="absolute transition-all duration-500 -translate-x-4 -translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0" />
				</div>
			</Link>

			{!isMobile && <Cursor position={position} />}
		</ul>
	);
};

export const Navbar = () => {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(true);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		if (typeof current === "number") {
			const direction = current - scrollYProgress.getPrevious()!;
			if (direction < 0) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		}
	});

	return (
		<>
			{/* Desktop Navbar */}
			<AnimatePresence mode="popLayout">
				<motion.nav
					initial={{ y: -100 }}
					animate={{ y: visible ? 0 : -150 }}
					transition={{ duration: 0.3 }}
					className="fixed z-[99999] w-full top-5 hidden md:block"
				>
					<div className="flex justify-center">
						<NavContent />
					</div>
				</motion.nav>
			</AnimatePresence>

			{/* Mobile Navbar */}
			<div className="md:hidden fixed z-[99999] top-0 left-0 right-0">
				<motion.div
					initial={{ y: -100 }}
					animate={{ y: visible ? -100 : 0 }}
					transition={{ duration: 0.2 }}
					className="bg-white dark:bg-gray-900 p-4 flex justify-between items-center shadow-lg"
				>
					<span className="font-bold">Brolang</span>

					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
					>
						{mobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</motion.div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 }}
							className="fixed top-[64px] left-0 right-0 bg-white dark:bg-gray-900 shadow-lg"
						>
							<NavContent isMobile={true} setMobileMenuOpen={setMobileMenuOpen} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};