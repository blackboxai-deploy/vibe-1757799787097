'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface Campaign {
  id: string;
  title: string;
  shortDescription: string;
  goalAmount: number;
  currentAmount: number;
  images: string;
  category: {
    name: string;
    color: string;
  };
  creator: {
    name: string;
    image?: string;
  };
  urgency: string;
  endDate?: string;
}

export function FeaturedCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration - in real app, this would be an API call
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        title: 'Emergency Textbook Fund for Low-Income Students',
        shortDescription: 'Help struggling students get essential textbooks for the new semester. Many students are forced to skip buying books due to financial constraints.',
        goalAmount: 2500,
        currentAmount: 1850,
        images: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/06b74d18-e201-4d6d-8fdd-2f62edb369ae.png',
        category: {
          name: 'Academic Support',
          color: '#3B82F6'
        },
        creator: {
          name: 'Sarah Johnson',
          image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8c64f2b9-6a9f-4525-b55d-82c581cf1c29.png'
        },
        urgency: 'HIGH',
        endDate: '2024-02-15'
      },
      {
        id: '2', 
        title: 'Campus Mental Health Support Center Expansion',
        shortDescription: 'Fund the expansion of our mental health center to provide better support for students dealing with stress and anxiety.',
        goalAmount: 5000,
        currentAmount: 3200,
        images: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b8b7a153-6933-4164-a476-390ac1416b9a.png',
        category: {
          name: 'Campus Improvement',
          color: '#10B981'
        },
        creator: {
          name: 'Student Wellness Committee',
          image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/adb7b363-f0ef-4320-a7ef-e1142f7256c6.png'
        },
        urgency: 'MEDIUM',
        endDate: '2024-03-01'
      },
      {
        id: '3',
        title: 'Thanksgiving Meals for International Students',
        shortDescription: 'Provide traditional Thanksgiving meals for international students who cannot travel home for the holidays.',
        goalAmount: 1200,
        currentAmount: 950,
        images: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/24b183fc-8fe3-412d-8352-9c584c79fbae.png',
        category: {
          name: 'Community Service',
          color: '#F59E0B'
        },
        creator: {
          name: 'International Student Association',
          image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d74b0cb2-8156-4b0b-b085-595e62d998b0.png'
        },
        urgency: 'CRITICAL',
        endDate: '2024-11-20'
      }
    ];
    
    // Simulate loading delay
    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setLoading(false);
    }, 1000);
  }, []);

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

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
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
    );
  }

  return (
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
            <CardTitle className="text-lg line-clamp-2 leading-tight">
              {campaign.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pb-3">
            <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={campaign.images} 
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
              <div className="text-xs text-gray-500">
                {Math.round(getProgressPercentage(campaign.currentAmount, campaign.goalAmount))}% funded
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
  );
}