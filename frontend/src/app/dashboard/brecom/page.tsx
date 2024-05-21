import * as React from "react";
import type { Metadata } from "next";
import Books from "@/components/books/books";

export const metadata = {
  title: `Feelify | Book recommendation `,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <Books />;
}
