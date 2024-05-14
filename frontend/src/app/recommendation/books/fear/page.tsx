import * as React from 'react';
import type { Metadata } from 'next';
import FearBooks from '@/components/books/fear-books';


export const metadata = { title: `Feelify | Books | Fear ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <FearBooks/>
  );
}
