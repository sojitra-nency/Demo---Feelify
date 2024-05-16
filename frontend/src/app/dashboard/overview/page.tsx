import * as React from 'react';
import type { Metadata } from 'next';
import Overview from '@/components/dashboard/overview';


export const metadata = { title: `Feelify | Dashboard ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
    <Overview/>
    </>
  );
}
