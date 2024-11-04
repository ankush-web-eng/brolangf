import { Metadata } from "next";
import DocumentationPage from "./docs";

export const metadata = {
    title: "Docs",
    description: "Documentation for the Brolang"
} satisfies Metadata;

export default function Page(){
    return <DocumentationPage />
}