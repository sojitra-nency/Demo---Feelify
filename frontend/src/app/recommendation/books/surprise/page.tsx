import * as React from 'react';
import type { Metadata } from 'next';
import SurpriseBooks from '@/components/books/surprise-books';


export const metadata = { title: `Feelify | Books | Surprise ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <SurpriseBooks/>
  );
}
