'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/home/hero';
import { StatsSection } from '@/components/home/stats-section';
import { FeaturedCampaigns } from '@/components/home/featured-campaigns';
import { CategoriesGrid } from '@/components/home/categories-grid';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Featured Campaigns */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Campaigns
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Support these urgent causes that need your help right now. Every donation makes a difference.
            </p>
          </div>
          
          <FeaturedCampaigns />
          
          <div className="text-center mt-12">
            <Link href="/campaigns">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View All Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find campaigns that matter to you across different areas of university life.
            </p>
          </div>
          
          <CategoriesGrid />
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your own campaign or support existing ones. Together, we can build a better campus community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <>
                <Link href="/campaigns/create">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start a Campaign
                  </Button>
                </Link>
                <Link href="/campaigns">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Browse Campaigns
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Sign In to Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}