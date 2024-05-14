import * as React from 'react';
import type { Metadata } from 'next';
import SadBooks from '@/components/books/sad-books';


export const metadata = { title: `Feelify | Books | Sad ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <SadBooks/>
  );
}
