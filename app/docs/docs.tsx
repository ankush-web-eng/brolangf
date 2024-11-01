'use client';

import Image from "next/image";

export default function Documentation() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="pt-20 px-3 md:px-6 flex flex-col space-y-6">
                <h1 className="text-2xl font-bold">Documentation for Bhai++</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {images.map((image, index) => (
                        <DocsImagePriview key={index} src={image.src} alt={image.alt} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const images = [
    {
        src: "/code/variable.png",
        alt: "variables",
    },
    {
        src: "/code/if-else.png",
        alt: "if-else",
    },
]

export const DocsImagePriview = ({ src, alt } : {src : string, alt : string}) => {
    return (
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image src={src} alt={alt} layout="fill" objectFit="fill" />
        </div>
    )
}