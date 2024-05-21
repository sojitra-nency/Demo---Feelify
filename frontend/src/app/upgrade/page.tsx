import * as React from "react";
import type { Metadata } from "next";
import PremiumUpgrade from "@/components/upgrade/premium-upgrade";

export const metadata = { title: `Feelify | Upgrade ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
      <PremiumUpgrade />
    </>
  );
}
