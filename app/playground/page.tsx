import { Metadata } from "next";
import CodePlaygroundPage from "./playground";

export const metadata = {
  title: "Playgroung",
  description: "Playground to test Bhai++ code snippets",
} satisfies Metadata;

export default function Page() {
  return <CodePlaygroundPage />
}