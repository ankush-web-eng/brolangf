import LandingPage from "@/components/layout/Landing";
import { Metadata } from "next";
import Head from "next/head";
import { siteConfig } from "@/config/metadata";

export const metadata = {
  title: "Brolang",
  description: "A fun programming language made for fun by Ankush written in Golang.",
} satisfies Metadata;

export default function Page() {
  return (
    <div>
      <Head>
        <title>{siteConfig.name}</title>
        <meta property="og:title" content={siteConfig.name} key="title" />
        <meta property="og:type" content="website" key="type" />
        <meta property="og:url" content={siteConfig.url} key="url" />
        <meta property="og:description" content={siteConfig.description} key="description" />
        <meta name="description" content={siteConfig.description} />
        <meta property="og:site_name" content="Brolang" key="siteName" />
      </Head>
      <LandingPage />
    </div>
  )
}
