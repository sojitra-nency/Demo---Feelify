import * as React from "react";
import type { Metadata } from "next";
import BookSearch from "@/components/books/book-search";

export const metadata = { title: `Feelify | Book Search ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <BookSearch />;
}
