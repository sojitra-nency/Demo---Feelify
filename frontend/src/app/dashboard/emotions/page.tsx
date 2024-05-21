import * as React from "react";
import type { Metadata } from "next";
import Recording from "@/components/emotions/recording";

export const metadata = {
  title: `Feelify | Emotion Detection `,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
      <Recording />
    </>
  );
}
