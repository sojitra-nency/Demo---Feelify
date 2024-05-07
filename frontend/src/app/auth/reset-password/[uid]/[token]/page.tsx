import * as React from 'react';
import type { Metadata } from 'next';



import { Layout } from '@/components/auth/layout';


export const metadata = { title: `Reset password | Auth ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      
            <>
            <p>Password Reset</p>
            </>
      
    </Layout>
  );
}
