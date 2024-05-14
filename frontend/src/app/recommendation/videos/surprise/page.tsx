import * as React from 'react';
import type { Metadata } from 'next';
import SurpriseVideos from '@/components/videos/surprise-videos';


export const metadata = { title: `Feelify | Videos | Surprise ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <SurpriseVideos/>
  );
}