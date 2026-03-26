import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { Geist } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
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
        instrumentSerif.variable
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
