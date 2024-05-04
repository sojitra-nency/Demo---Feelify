// TermsAndConditions.tsx
'use client';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { paths } from '@/paths';
import { useRouter } from 'next/navigation';

export function TermsAndConditions(): React.JSX.Element {
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push(paths.auth.signUp);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify">
        These terms and conditions outline the rules and regulations for the use of our website.
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify">
        By accessing this website we assume you accept these terms and conditions in full. Do not continue to use our
        website if you do not accept all of the terms and conditions stated on this page.
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify">
        Read our full{' '}
        <Link color="primary">
          Privacy Policy
        </Link>{' '}
        to know more about how we handle your personal information.
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify">
        We employ the use of cookies. By using our website you consent to the use of cookies in accordance with our{' '}
        <Link color="primary">
          Cookie Policy
        </Link>
        .
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify">
        You must not use this website in any way that causes, or may cause, damage to the website or impairment of the
        availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful,
        or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.
      </Typography>

      <Button variant="contained" onClick={handleSignUpClick}>
        Back to Sign Up
      </Button>
    </div>
  );
};


