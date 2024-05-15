import * as React from 'react';
import type { Metadata } from 'next';
import EmotionVideos from '@/components/videos/emotion-videos';


export const metadata = { title: `Feelify | Videos | Surprise ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <EmotionVideos title="Expect the unexpected with these surprising videos." queries={['unboxing', 'magictricks', 'pranks' , 'reactionvideos', 'suspense', 'unexpected', 'mindblowing' , 'illusion', 'mystery', 'satisfying']} subtitle={['Unboxing Videos', 'Magic Tricks', 'Pranks' , 'Reaction Videos', 'Suspense Videos', 'Unexpected Videos', 'Mind Blowing Videos' , 'Illusional Videos', 'Mystery', 'Satisfying Videos']}/>
  );
}