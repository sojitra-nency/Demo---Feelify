import * as React from 'react';
import type { Metadata } from 'next';
import EmotionBooks from '@/components/books/emotion-books';


export const metadata = { title: `Feelify | Books | Fear ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <EmotionBooks title="Book Recommendation for Fear Emotion" queries={['socialanxiety', 'anxietyrelief', 'phobia' , 'selfhelp', 'fearoffailure', 'stressmanagement', 'panicattacks' , 'mentalhealth', 'mindfulness', 'healthanxiety']} subtitle={['Overcome Social Anxiety', 'anxietyrelief', 'Overcome Phobia' , 'Self-Help Books', 'Overcome Fear of Failure', 'Stress Management Books', 'Books for Panic Attacks' , 'Books for Mental Health', 'Mindfulness Books', 'Health Anxiety']}/>
  );
}
