import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { TermsAndConditions } from '@/components/auth/terms-condition';

export const metadata = { title: `Terms | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
      <TermsAndConditions/>
      </GuestGuard>
    </Layout>
  );
}