import * as React from 'react';
import type { Metadata } from 'next';
import EmotionAnalysis from '@/components/emotions/emotion-analysis';


export const metadata = { title: `Feelify | Emotion Detection ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
    <EmotionAnalysis/>
    </>
  );
}
