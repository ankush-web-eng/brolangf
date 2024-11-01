import { Metadata } from "next";
import Documentation from "./docs";

export const metadata = {
    title: "Docs",
    description: "Documentation for the Bhai++"
} satisfies Metadata;

export default function Page(){
    return <Documentation />
}