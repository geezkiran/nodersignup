import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { Geist, Instrument_Serif, Instrument_Sans, Sulphur_Point } from "next/font/google";
import { cn } from "@/lib/utils";

const geistSans = Geist({ 
  subsets: ['latin'], 
  variable: '--font-geist-sans' 
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
});

const sulphurPoint = Sulphur_Point({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-sulphur-point',
});

export const metadata = {
  title: 'Noder',
  description: 'Light Speed Learning',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={cn(
        "font-sans", 
        geistSans.variable, 
        instrumentSerif.variable,
        instrumentSans.variable,
        sulphurPoint.variable
      )} 
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('themeMode')||'system';var d=m==='dark'||(m==='system'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',!!d);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
