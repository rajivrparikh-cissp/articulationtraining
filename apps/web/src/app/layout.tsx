import React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'ExecutiveVoice | 28-Day Articulation Training (9 Mins/Day)',
  description: 'Resume and certificates get you in the room. Voice and articulation get you the job. 9 minutes a day to transition from Manager to VP or Director.',
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070a12] text-slate-100 antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
