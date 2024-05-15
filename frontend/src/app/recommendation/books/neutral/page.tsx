import * as React from 'react';
import type { Metadata } from 'next';
import EmotionBooks from '@/components/books/emotion-books';


export const metadata = { title: `Feelify | Books | Neutral ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <EmotionBooks title="Book Recommendation for Neutral Emotion" queries={['Science', 'History', 'Biography' , 'Nature', 'Tranquil', 'Reflective', 'Culture' , 'Instructional', 'Observations', 'Environment']} subtitle={['Science Books', 'Historical Books', 'Biography' , 'Nature', 'Tranquil Books', 'Reflective Books', 'Cultural Books' , 'Instructional Books', 'Observational Books', 'Environmental Books']}/>
  );
}
