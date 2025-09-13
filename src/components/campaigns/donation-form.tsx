'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface DonationFormProps {
  campaignId: string;
  onSuccess?: () => void;
}

export function DonationForm({ campaignId, onSuccess }: DonationFormProps) {
  const { data: session } = useSession();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250];

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      signIn();
      return;
    }

    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (donationAmount < 5) {
      toast.error('Minimum donation amount is $5');
      return;
    }

    setLoading(true);

    try {
      // First create the donation record
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          amount: donationAmount,
          message: message.trim() || null,
          anonymous,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process donation');
      }

      const donation = await response.json();

      // For demo purposes, we'll simulate successful payment
      // In a real app, this would integrate with Stripe
      toast.success('Thank you for your donation!');
      
      // Reset form
      setAmount('');
      setMessage('');
      setAnonymous(false);
      
      // Trigger parent component to refresh
      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error('Donation error:', error);
      toast.error('Failed to process donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Make a Donation</CardTitle>
      </CardHeader>
      <CardContent>
        {session ? (
          <form onSubmit={handleDonate} className="space-y-4">
            {/* Predefined Amounts */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Select Amount
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {predefinedAmounts.map((preAmount) => (
                  <Button
                    key={preAmount}
                    type="button"
                    variant={amount === preAmount.toString() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAmount(preAmount.toString())}
                  >
                    ${preAmount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Or Enter Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  min="5"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum donation: $5</p>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Message (Optional)
              </label>
              <Textarea
                placeholder="Leave a message of support..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {message.length}/500 characters
              </p>
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={anonymous}
                onCheckedChange={(checked) => setAnonymous(checked as boolean)}
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Donate anonymously
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading || !amount || parseFloat(amount) < 5}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Donate $${amount || '0'}`
              )}
            </Button>

            <div className="text-xs text-gray-500 text-center">
              <p>🔒 Secure payment processing</p>
              <p>Your donation helps support this cause</p>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Please sign in to make a donation
            </p>
            <Button 
              onClick={() => signIn()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Sign In to Donate
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}