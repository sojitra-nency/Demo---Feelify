import * as React from 'react';
import type { Metadata } from 'next';
import EmotionVideos from '@/components/videos/emotion-videos';


export const metadata = { title: `Feelify | Videos | Neutral ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <EmotionVideos title="Open the door to endless possibilities. Click play and let the adventure begin." queries={['ambience', 'satisfying', 'educational' , 'travelvlog', 'howto', 'podcastclips', 'storytime' , 'slowtv', 'behindthescenes', 'animalvideos']}/>
  );
}