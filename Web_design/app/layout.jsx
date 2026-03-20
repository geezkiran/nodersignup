import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata = {
  title: 'Noder',
  description: 'Join thousands of teams scaling with Noder.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
