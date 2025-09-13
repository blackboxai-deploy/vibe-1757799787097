'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DonationForm } from '@/components/campaigns/donation-form';
import Link from 'next/link';

interface Campaign {
  id: string;
  title: string;
  description: string;
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
    department?: string;
  };
  urgency: string;
  endDate?: string;
  donorCount: number;
  featured: boolean;
  donations: Donation[];
  comments: Comment[];
  createdAt: string;
}

interface Donation {
  id: string;
  amount: number;
  message?: string;
  anonymous: boolean;
  createdAt: string;
  donor: {
    id: string;
    name: string;
    image?: string;
  };
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    image?: string;
  };
}

export default function CampaignDetailPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCampaign();
    }
  }, [params.id]);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/campaigns/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setCampaign(data);
      } else {
        console.error('Campaign not found');
      }
    } catch (error) {
      console.error('Error fetching campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    try {
      setSubmittingComment(true);
      const response = await fetch(`/api/campaigns/${params.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        setNewComment('');
        fetchCampaign(); // Refresh to show new comment
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmittingComment(false);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="aspect-video bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-200 rounded h-64"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
          <p className="text-gray-600 mb-8">The campaign you're looking for doesn't exist or has been removed.</p>
          <Link href="/campaigns">
            <Button>Browse All Campaigns</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/campaigns" className="hover:text-blue-600">Campaigns</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{campaign.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge 
                  variant={getUrgencyColor(campaign.urgency) as any}
                  className="text-sm"
                >
                  {campaign.urgency}
                </Badge>
                <Badge 
                  variant="outline" 
                  style={{ borderColor: campaign.category.color, color: campaign.category.color }}
                  className="text-sm"
                >
                  {campaign.category.name}
                </Badge>
                {campaign.featured && (
                  <Badge variant="default" className="text-sm bg-yellow-500">
                    Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {campaign.title}
              </h1>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={campaign.creator.image} />
                    <AvatarFallback>{campaign.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>by {campaign.creator.name}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span>{formatDate(campaign.createdAt)}</span>
                {campaign.creator.department && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <span>{campaign.creator.department}</span>
                  </>
                )}
              </div>
            </div>

            {/* Campaign Image */}
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={campaign.images || 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6d3987a9-8f59-4652-a303-c3cf5a01bc45.png'}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Campaign Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                  {campaign.description}
                </div>
              </CardContent>
            </Card>

            {/* Donations List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
              </CardHeader>
              <CardContent>
                {campaign.donations.length > 0 ? (
                  <div className="space-y-4">
                    {campaign.donations.slice(0, 10).map((donation) => (
                      <div key={donation.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={donation.anonymous ? '' : donation.donor.image} />
                          <AvatarFallback>
                            {donation.anonymous ? '?' : donation.donor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900">
                              {donation.anonymous ? 'Anonymous' : donation.donor.name}
                            </p>
                            <span className="text-sm font-semibold text-green-600">
                              {formatCurrency(donation.amount)}
                            </span>
                          </div>
                          {donation.message && (
                            <p className="text-sm text-gray-600">{donation.message}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(donation.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No donations yet. Be the first to support this campaign!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add Comment Form */}
                {session && (
                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <Textarea
                      placeholder="Share your thoughts about this campaign..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-3"
                    />
                    <Button 
                      type="submit" 
                      disabled={!newComment.trim() || submittingComment}
                      size="sm"
                    >
                      {submittingComment ? 'Posting...' : 'Post Comment'}
                    </Button>
                  </form>
                )}

                {/* Comments List */}
                {campaign.comments.length > 0 ? (
                  <div className="space-y-4">
                    {campaign.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.author.image} />
                          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-medium text-gray-900">
                              {comment.author.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(comment.createdAt)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Progress */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatCurrency(campaign.currentAmount)}
                    </div>
                    <div className="text-sm text-gray-600">
                      raised of {formatCurrency(campaign.goalAmount)} goal
                    </div>
                  </div>

                  <Progress 
                    value={getProgressPercentage(campaign.currentAmount, campaign.goalAmount)} 
                    className="h-3"
                  />

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-semibold text-gray-900">
                        {Math.round(getProgressPercentage(campaign.currentAmount, campaign.goalAmount))}%
                      </div>
                      <div className="text-xs text-gray-600">Funded</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-gray-900">
                        {campaign.donorCount}
                      </div>
                      <div className="text-xs text-gray-600">Donors</div>
                    </div>
                  </div>

                  {campaign.endDate && (
                    <div className="text-center pt-2 border-t">
                      <div className="text-sm text-gray-600">
                        Campaign ends on {formatDate(campaign.endDate)}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Donation Form */}
            <DonationForm campaignId={campaign.id} onSuccess={fetchCampaign} />

            {/* Share */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Help spread the word about this campaign
                </p>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const url = `${window.location.origin}/campaigns/${campaign.id}`;
                      const text = `Check out this campaign: ${campaign.title}`;
                      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                      window.open(shareUrl, '_blank');
                    }}
                  >
                    Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const url = `${window.location.origin}/campaigns/${campaign.id}`;
                      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                      window.open(shareUrl, '_blank');
                    }}
                  >
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/campaigns/${campaign.id}`);
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}