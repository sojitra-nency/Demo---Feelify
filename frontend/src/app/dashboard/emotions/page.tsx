import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export const metadata = { title: `Feelify | Emotion Detection ` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Emotion Detection</Typography>
      </div>
    </Stack>
  );
}