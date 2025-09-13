'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRaised: number;
  totalDonors: number;
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalRaised: 0,
    totalDonors: 0,
  });

  useEffect(() => {
    // Simulate loading stats - in real app, this would be an API call
    const mockStats = {
      totalCampaigns: 47,
      activeCampaigns: 24,
      totalRaised: 28750,
      totalDonors: 189,
    };
    
    // Animate numbers
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStats({
        totalCampaigns: Math.floor(mockStats.totalCampaigns * progress),
        activeCampaigns: Math.floor(mockStats.activeCampaigns * progress),
        totalRaised: Math.floor(mockStats.totalRaised * progress),
        totalDonors: Math.floor(mockStats.totalDonors * progress),
      });
      
      if (step >= steps) {
        clearInterval(timer);
        setStats(mockStats);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Making an Impact Together
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our university community is coming together to create positive change
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl">🎯</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stats.totalCampaigns}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Total Campaigns
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl">🚀</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stats.activeCampaigns}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Active Campaigns
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl">💰</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(stats.totalRaised)}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Funds Raised
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl">❤️</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stats.totalDonors}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Happy Donors
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}