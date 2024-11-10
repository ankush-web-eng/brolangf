import { Metadata } from "next";
import CodePlaygroundPage from "./playground";
import Head from "next/head";
import siteConfig from "@/config/metadata";

export const metadata = {
  title: "Playgroung",
  description: "Have fun with Brolang",
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
      <CodePlaygroundPage />
    </div>
  )
}