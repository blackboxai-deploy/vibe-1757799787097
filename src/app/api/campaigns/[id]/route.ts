import { NextRequest, NextResponse } from 'next/server';
import { demoCampaigns } from '@/lib/demo-data';

export async function GET(request: NextRequest) {
  try {
    // Extract ID from URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    const campaign = demoCampaigns.find(c => c.id === id);

    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    // Calculate current amount from donations
    const currentAmount = campaign.donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );

    const campaignWithStats = {
      ...campaign,
      currentAmount,
      donorCount: campaign.donations.length,
    };

    return NextResponse.json(campaignWithStats);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaign' },
      { status: 500 }
    );
  }
}