import * as React from 'react';
import type { Metadata } from 'next';
import { Library } from '@/components/dashboard/favourites/library';


export const metadata = { title: `Feelify | My Library ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
    <Library/>
    </>
  );
}
