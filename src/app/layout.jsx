import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata = {
  title: 'Noder',
  description: 'LightSpeed Learning',
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
