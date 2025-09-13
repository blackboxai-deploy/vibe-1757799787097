'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  // Demo session for testing
  const demoSession = { user: { name: 'Demo Student' } };

  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Empower Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 block">University Community</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Join your fellow students in creating positive change on campus. Support good causes, 
                help those in need, and fund innovative projects that make a difference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {demoSession ? (
                <>
                  <Link href="/campaigns">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
                      Browse Campaigns
                    </Button>
                  </Link>
                  <Link href="/campaigns/create">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950">
                      Start Your Campaign
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/campaigns">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950">
                      View Campaigns
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>University Students Only</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Admin Approved</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 p-8 shadow-2xl">
              <img 
                src="https://storage.googleapis.com/workspace-wm2d0q2e69be4xsqhfj7tg9x2e5/image/20g4p7b1wdgzcdqn8ot2d7ct11.webp" 
                alt="Students collaborating on campus projects with laptops and books in modern university setting"
                className="w-full h-full object-cover rounded-xl"
                loading="eager"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hidden lg:block border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Active Campaigns</div>
              <div className="text-2xl font-bold text-red-600">24</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hidden lg:block border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Funds Raised</div>
              <div className="text-2xl font-bold text-orange-600">$12,450</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-100/50 to-orange-100/50 dark:from-red-900/20 dark:to-orange-900/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}