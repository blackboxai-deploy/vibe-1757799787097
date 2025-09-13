'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function CreateCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    goalAmount: '',
    categoryId: '',
    urgency: 'MEDIUM',
    endDate: '',
  });

  const categories = [
    { id: '1', name: 'Academic Support', color: '#3B82F6' },
    { id: '2', name: 'Emergency Aid', color: '#EF4444' },
    { id: '3', name: 'Campus Improvement', color: '#10B981' },
    { id: '4', name: 'Community Service', color: '#F59E0B' },
    { id: '5', name: 'Research & Innovation', color: '#8B5CF6' },
    { id: '6', name: 'Sports & Recreation', color: '#06B6D4' },
  ];

  const urgencyLevels = [
    { value: 'LOW', label: 'Low Priority', color: 'bg-gray-100 text-gray-800' },
    { value: 'MEDIUM', label: 'Medium Priority', color: 'bg-blue-100 text-blue-800' },
    { value: 'HIGH', label: 'High Priority', color: 'bg-orange-100 text-orange-800' },
    { value: 'CRITICAL', label: 'Critical/Urgent', color: 'bg-red-100 text-red-800' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.goalAmount || !formData.categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }

    const goalAmount = parseFloat(formData.goalAmount);
    if (isNaN(goalAmount) || goalAmount < 50) {
      toast.error('Goal amount must be at least $50');
      return;
    }

    setLoading(true);

    try {
      // For demo purposes, simulate campaign creation
      toast.success('Campaign created successfully! It will be reviewed by administrators before going live.');
      
      // Redirect to campaigns page
      setTimeout(() => {
        router.push('/campaigns');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create a Campaign</h1>
          <p className="text-lg text-gray-600">
            Start a campaign to raise funds for your cause. All campaigns are reviewed by administrators before going live.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Campaign Title *
                </label>
                <Input
                  placeholder="Enter a compelling title for your campaign"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  maxLength={100}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
              </div>

              {/* Short Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Short Description *
                </label>
                <Textarea
                  placeholder="Brief summary of your campaign (will appear in campaign listings)"
                  value={formData.shortDescription}
                  onChange={(e) => updateFormData('shortDescription', e.target.value)}
                  rows={2}
                  maxLength={200}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/200 characters</p>
              </div>

              {/* Full Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Full Description *
                </label>
                <Textarea
                  placeholder="Detailed description of your campaign, goals, and how funds will be used"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={8}
                  maxLength={5000}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/5000 characters</p>
              </div>

              {/* Goal Amount and Category */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Funding Goal *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="number"
                      min="50"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.goalAmount}
                      onChange={(e) => updateFormData('goalAmount', e.target.value)}
                      className="pl-8"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Minimum goal: $50</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category *
                  </label>
                  <Select value={formData.categoryId} onValueChange={(value) => updateFormData('categoryId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Urgency and End Date */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Urgency Level
                  </label>
                  <div className="space-y-2">
                    {urgencyLevels.map((level) => (
                      <label key={level.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="urgency"
                          value={level.value}
                          checked={formData.urgency === level.value}
                          onChange={(e) => updateFormData('urgency', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Badge className={level.color} variant="secondary">
                          {level.label}
                        </Badge>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Campaign End Date (Optional)
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => updateFormData('endDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank for no end date</p>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm text-blue-900 mb-2">Review Process</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Your campaign will be reviewed by administrators before going live</li>
                  <li>• Review typically takes 1-3 business days</li>
                  <li>• You will be notified via email when your campaign is approved</li>
                  <li>• Make sure all information is accurate and follows university guidelines</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Creating Campaign...</span>
                    </div>
                  ) : (
                    'Create Campaign'
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}