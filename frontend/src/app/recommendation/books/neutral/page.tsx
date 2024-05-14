import * as React from 'react';
import type { Metadata } from 'next';
import NeutralBooks from '@/components/books/neutral-books';


export const metadata = { title: `Feelify | Books | Neutral ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <NeutralBooks/>
  );
}
