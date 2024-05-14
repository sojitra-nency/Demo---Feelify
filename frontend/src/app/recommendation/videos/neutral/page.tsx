import * as React from 'react';
import type { Metadata } from 'next';
import NeutralVideos from '@/components/videos/neutral-videos';


export const metadata = { title: `Feelify | Videos | Neutral ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <NeutralVideos/>
  );
}