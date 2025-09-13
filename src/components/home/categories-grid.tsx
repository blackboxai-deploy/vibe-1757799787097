'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  campaignCount: number;
}

export function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration - in real app, this would be an API call
    const mockCategories: Category[] = [
      {
        id: '1',
        name: 'Academic Support',
        description: 'Help fellow students with textbooks, supplies, and educational needs',
        color: '#3B82F6',
        icon: '🎓',
        campaignCount: 12
      },
      {
        id: '2',
        name: 'Emergency Aid',
        description: 'Support students facing unexpected financial difficulties',
        color: '#EF4444',
        icon: '🆘',
        campaignCount: 8
      },
      {
        id: '3',
        name: 'Campus Improvement',
        description: 'Projects to enhance campus facilities and student life',
        color: '#10B981',
        icon: '🏫',
        campaignCount: 15
      },
      {
        id: '4',
        name: 'Community Service',
        description: 'Give back to the local community and those in need',
        color: '#F59E0B',
        icon: '🤝',
        campaignCount: 9
      },
      {
        id: '5',
        name: 'Research & Innovation',
        description: 'Fund student research projects and innovative ideas',
        color: '#8B5CF6',
        icon: '🔬',
        campaignCount: 6
      },
      {
        id: '6',
        name: 'Sports & Recreation',
        description: 'Support athletic teams and recreational activities',
        color: '#06B6D4',
        icon: '⚽',
        campaignCount: 11
      }
    ];
    
    // Simulate loading delay
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/campaigns?category=${category.id}`}>
          <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardHeader className="pb-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-2xl group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {category.icon}
              </div>
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                {category.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span 
                  className="text-sm font-medium px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: `${category.color}10`, 
                    color: category.color 
                  }}
                >
                  {category.campaignCount} campaigns
                </span>
                <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}