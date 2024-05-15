import * as React from 'react';
import type { Metadata } from 'next';
import EmotionVideos from '@/components/videos/emotion-videos';


export const metadata = { title: `Feelify | Videos | Sad ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <EmotionVideos title="Turn your blues into hues with these uplifting videos." queries={['relaxingmusic', 'motivation', 'comforting' , 'nature', 'wholesome', 'lofihiphop', 'meditation' , 'storytime', 'mentalhealth', 'gaming']} subtitle={['Relaxing Music', 'Motivational Videos', 'Comforting Videos' , 'Nature', 'Wholesome', 'Lofi Hiphop', 'Meditation' , 'Story Time', 'Mental Health', 'Gaming']}/>
  );
}