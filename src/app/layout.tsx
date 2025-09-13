import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/providers/auth-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UniFund - University Crowdfunding Platform',
  description: 'Support good causes, help less fortunate students, and improve campus life through our university crowdfunding platform.',
  keywords: ['crowdfunding', 'university', 'donations', 'students', 'campus'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}