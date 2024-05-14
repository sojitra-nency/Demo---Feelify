import * as React from 'react';
import type { Metadata } from 'next';
import SadVideos from '@/components/videos/sad-videos';


export const metadata = { title: `Feelify | Videos | Sad ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <SadVideos/>
  );
}