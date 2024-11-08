import { Metadata } from "next";
import CodePlaygroundPage from "./playground";

export const metadata = {
  title: "Playgroung",
  description: "Have fun with Brolang",
} satisfies Metadata;

export default function Page() {
  return <CodePlaygroundPage />
}