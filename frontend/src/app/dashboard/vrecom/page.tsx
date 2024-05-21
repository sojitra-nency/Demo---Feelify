import * as React from "react";
import type { Metadata } from "next";
import Videos from "@/components/videos/videos";

export const metadata = {
  title: `Feelify | Video recommendation `,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <Videos />;
}
