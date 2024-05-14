import * as React from 'react';
import type { Metadata } from 'next';
import HappyBooks from '@/components/books/happy-books';


export const metadata = { title: `Feelify | Books | Happy ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <HappyBooks/>
  );
}
