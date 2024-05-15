import * as React from 'react';
import type { Metadata } from 'next';
import EmotionBooks from '@/components/books/emotion-books';


export const metadata = { title: `Feelify | Books | Happy ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <EmotionBooks title="Book Recommendation for Happy Emotion" queries={['humor', 'comedy', 'gratitude' , 'happiness', 'romatic', 'gratitude', 'joy' , 'self-love', 'heartwarming', 'positivity']}/>
  );
}
