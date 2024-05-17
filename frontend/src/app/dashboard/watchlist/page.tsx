import * as React from 'react';
import type { Metadata } from 'next';
import { WatchList } from '@/components/dashboard/favourites/watchlist';


export const metadata = { title: `Feelify | My WatchList ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
    <WatchList/>
    </>
  );
}
