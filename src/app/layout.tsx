import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

import Providers from '@/lib/providers/Provider';
import { SidebarProvider } from '@/theme-template/context/SidebarContext';
import { ThemeProvider } from '@/theme-template/context/ThemeContext';

const outfit = Outfit({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pr handicraft admin',
  description: 'Pr handicraft',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Providers>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
