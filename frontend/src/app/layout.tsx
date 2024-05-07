import * as React from 'react';
import type { Viewport } from 'next';

// import '@/styles/global.css';

import Provider from '@/redux/provider';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;
import { Setup } from '@/components/utils'

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
            <Provider>
              <Setup />
                <ThemeProvider>{children}</ThemeProvider>
            </Provider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
