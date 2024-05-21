import * as React from "react";
import type { Metadata } from "next";
import { AboutUs } from "@/components/dashboard/about-us";

export const metadata = { title: `Feelify | About Us ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
      <AboutUs />
    </>
  );
}
