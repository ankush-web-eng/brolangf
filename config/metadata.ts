import type { Metadata } from "next";

const siteConfig = {
    name: "Brolang",
    description: "A fun programming language made for fun by Ankush written in Golang.",
    url: "https://brolang.ankushsingh.tech",
    ogImage: "https://brolang.ankushsingh.tech/landing.png",
    profileImage: "https://brolang.ankushsingh.tech/favicon-32x32.png",
    twitter: "@whyankush07",
    themeColor: "#F0F0F0"
};

export const metadata = {
    title: {
        default: `${siteConfig.name} - A fun programming language!`,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ["Ankush Singh Tech", "Brolang", "Programming Language", "Fun Programming Language", "Toy language", "Golang"],
    authors: [{ name: "Ankush Singh" }],
    creator: "Ankush Singh",

    metadataBase: new URL(siteConfig.url),
    alternates: {
        canonical: "/",
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: `${siteConfig.name} - A fun programming language!`,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [{
            url: siteConfig.ogImage,
            width: 1200,
            height: 627,
            alt: siteConfig.name,
        }],
    },

    twitter: {
        card: "summary_large_image",
        creator: siteConfig.twitter,
        title: `${siteConfig.name} - A fun programming language!`,
        description: siteConfig.description,
        images: [{
            url: siteConfig.ogImage,
            width: 1200,
            height: 627,
            alt: siteConfig.name,
        }],
    },

    manifest: "/manifest.webmanifest",

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // verification: {
    //     google: "",
    // },
    
} satisfies Metadata;

export default siteConfig;