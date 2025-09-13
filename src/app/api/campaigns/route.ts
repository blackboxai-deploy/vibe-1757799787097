import { NextRequest, NextResponse } from 'next/server';
import { demoCampaigns } from '@/lib/demo-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filteredCampaigns = [...demoCampaigns];

    // Filter by category
    if (category) {
      filteredCampaigns = filteredCampaigns.filter(c => c.category.id === category);
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCampaigns = filteredCampaigns.filter(c => 
        c.title.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower)
      );
    }

    const total = filteredCampaigns.length;
    const startIndex = (page - 1) * limit;
    const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + limit);

    // Add donation count to each campaign
    const campaignsWithStats = paginatedCampaigns.map(campaign => ({
      ...campaign,
      donorCount: campaign.donations.length,
    }));

    return NextResponse.json({
      campaigns: campaignsWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}