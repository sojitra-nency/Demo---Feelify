import * as React from 'react';
import type { Metadata } from 'next';
import EmotionBooks from '@/components/books/emotion-books';


export const metadata = { title: `Feelify | Books | Surprise ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <EmotionBooks title="Book Recommendation for Surprise Emotion" queries={['Mystery', 'Thriller', 'Speculative' , 'Fiction', 'Unexpected', 'Wonder', 'Non-Fiction' , 'Page-Turner', 'Twists', 'Unforgettable']}/>
  );
}
