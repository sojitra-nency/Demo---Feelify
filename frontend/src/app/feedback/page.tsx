import * as React from 'react';
import type { Metadata } from 'next';
import { AboutUs } from '@/components/dashboard/about-us';
import FeedBack from '@/components/feedback/feedback-form';


export const metadata = { title: `Feelify | Feedback ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
    <FeedBack/>
    </>
  );
}
