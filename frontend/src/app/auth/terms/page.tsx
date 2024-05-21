import * as React from "react";
import type { Metadata } from "next";
import { Layout } from "@/components/auth/layout";
import { TermsAndConditions } from "@/components/auth/terms-condition";

export const metadata = {
  title: `Feelify | Terms and Conditions `,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <TermsAndConditions />
    </Layout>
  );
}
