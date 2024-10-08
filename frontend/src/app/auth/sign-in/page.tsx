import * as React from "react";
import type { Metadata } from "next";

import { Layout } from "@/components/auth/layout";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata = { title: `Feelify | Sign In` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <SignInForm />
    </Layout>
  );
}
