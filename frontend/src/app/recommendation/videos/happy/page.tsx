import * as React from 'react';
import type { Metadata } from 'next';
import HappyVideos from '@/components/videos/happy-videos';


export const metadata = { title: `Feelify | Videos | Happy ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <HappyVideos/>
  );
}