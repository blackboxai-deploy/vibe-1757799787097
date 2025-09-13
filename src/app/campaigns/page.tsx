'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Campaign {
  id: string;
  title: string;
  shortDescription: string;
  goalAmount: number;
  currentAmount: number;
  images: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
  creator: {
    id: string;
    name: string;
    image?: string;
  };
  urgency: string;
  endDate?: string;
  donorCount: number;
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    fetchCampaigns();
    fetchCategories();
  }, [search, selectedCategory, sortBy]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const response = await fetch(`/api/campaigns?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'CRITICAL': return 'destructive';
      case 'HIGH': return 'secondary';
      case 'MEDIUM': return 'default';
      default: return 'outline';
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCampaigns();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Campaigns</h1>
          <p className="text-lg text-gray-600">
            Discover and support campaigns that make a difference in our university community.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <Input
                placeholder="Search campaigns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </form>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-64">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="ending">Ending Soon</SelectItem>
                <SelectItem value="funded">Most Funded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <Card className="h-full">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <>
            {campaigns.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge 
                          variant={getUrgencyColor(campaign.urgency) as any}
                          className="text-xs"
                        >
                          {campaign.urgency}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          style={{ borderColor: campaign.category.color, color: campaign.category.color }}
                          className="text-xs"
                        >
                          {campaign.category.name}
                        </Badge>
                      </div>
                      {campaign.featured && (
                        <Badge variant="default" className="text-xs mb-2 bg-yellow-500">
                          Featured
                        </Badge>
                      )}
                      <CardTitle className="text-lg line-clamp-2 leading-tight">
                        {campaign.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={campaign.images || 'https://storage.googleapis.com/workspace-wm2d0q2e69be4xsqhfj7tg9x2e5/image/vr0hxnef8o2bggk97fre4h5ded.webp'} 
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {campaign.shortDescription}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-900">
                            {formatCurrency(campaign.currentAmount)} raised
                          </span>
                          <span className="text-gray-500">
                            of {formatCurrency(campaign.goalAmount)}
                          </span>
                        </div>
                        <Progress 
                          value={getProgressPercentage(campaign.currentAmount, campaign.goalAmount)} 
                          className="h-2"
                        />
                        <div className="text-xs text-gray-500 flex justify-between">
                          <span>
                            {Math.round(getProgressPercentage(campaign.currentAmount, campaign.goalAmount))}% funded
                          </span>
                          <span>
                            {campaign.donorCount} donors
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <div className="w-full space-y-3">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          {campaign.creator.image && (
                            <img 
                              src={campaign.creator.image} 
                              alt={campaign.creator.name}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                          <span>by {campaign.creator.name}</span>
                        </div>
                        <Link href={`/campaigns/${campaign.id}`} className="block">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            View Campaign
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4 text-gray-400 text-6xl">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters to find what you are looking for.
                </p>
                <Button onClick={() => {
                  setSearch('');
                  setSelectedCategory('');
                  setSortBy('recent');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}