import LandingPage from "@/components/layout/Landing";
import { Metadata } from "next";

export const metadata = {
  title: "Brolang",
  description: "A fun programming language made for fun by Ankush written in Golang.",
  openGraph: {
    images: [{
      url: "/landing.png"
    }]
  }
} satisfies Metadata;

export default function Page() {
  return <LandingPage />;
}
