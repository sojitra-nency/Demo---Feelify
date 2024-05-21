import * as React from "react";
import type { Metadata } from "next";
import Contact from "@/components/contact/contact-form";

export const metadata = { title: `Feelify | Contact Us ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
      <Contact />
    </>
  );
}
