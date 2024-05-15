import * as React from 'react';
import type { Metadata } from 'next';
import EmotionVideos from '@/components/videos/emotion-videos';


export const metadata = { title: `Feelify | Videos | Happy ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <EmotionVideos title="Escape the ordinary and discover extraordinary moments of happiness." queries={['JoyfulMoments', 'HappinessBoost', 'CelebratingLife' , 'PositiveVibes', 'GoodMoodMusic', 'InspiringStories', 'lifestyle' , 'Travel', 'Adventure', 'UpliftingMusic']}/>
  );
}