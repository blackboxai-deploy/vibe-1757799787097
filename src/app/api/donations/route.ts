import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, amount, message, anonymous = false } = body;

    // Validate required fields
    if (!campaignId || !amount) {
      return NextResponse.json(
        { error: 'Campaign ID and amount are required' },
        { status: 400 }
      );
    }

    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount < 5) {
      return NextResponse.json(
        { error: 'Minimum donation amount is $5' },
        { status: 400 }
      );
    }

    // For demo purposes, simulate successful donation
    const donation = {
      id: `donation_${Date.now()}`,
      amount: donationAmount,
      message: message || null,
      anonymous,
      campaignId,
      donorId: 'demo_user',
      status: 'COMPLETED',
      stripePaymentId: `demo_${Date.now()}`,
      createdAt: new Date().toISOString(),
      donor: {
        id: 'demo_user',
        name: 'Demo User',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      },
      campaign: {
        id: campaignId,
        title: 'Demo Campaign',
      },
    };

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error('Error processing donation:', error);
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    );
  }
}