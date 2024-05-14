import * as React from 'react';
import type { Metadata } from 'next';
import FearVideos from '@/components/videos/fear-videos';


export const metadata = { title: `Feelify | Videos | Fear ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <FearVideos/>
  );
}
