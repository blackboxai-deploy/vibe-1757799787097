// Demo data for development and testing
export const demoCampaigns = [
  {
    id: '1',
    title: 'Emergency Textbook Fund for Low-Income Students',
    shortDescription: 'Help struggling students get essential textbooks for the new semester. Many students are forced to skip buying books due to financial constraints.',
    description: `This campaign aims to provide essential textbooks and learning materials to students who cannot afford them.

Many of our fellow students are struggling financially and have to choose between buying textbooks or paying for basic needs like food and housing. This creates a significant barrier to their academic success.

Your donation will go directly toward purchasing:
- Required textbooks for core courses
- Study guides and supplemental materials  
- Digital access codes for online learning platforms
- Scientific calculators and other essential tools

Every dollar helps level the playing field and ensures that financial hardship doesn't prevent students from accessing the education they deserve.

Together, we can make sure that every student has the resources they need to succeed academically, regardless of their financial situation.`,
    goalAmount: 2500,
    currentAmount: 1850,
    images: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&crop=center',
    category: {
      id: '1',
      name: 'Academic Support',
      color: '#3B82F6'
    },
    creator: {
      id: 'user1',
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    urgency: 'HIGH',
    endDate: '2024-02-15',
    featured: true,
    status: 'APPROVED',
    donations: [
      {
        id: 'don1',
        amount: 50,
        message: 'Happy to help fellow students succeed!',
        anonymous: false,
        createdAt: '2024-01-10T10:00:00Z',
        donor: {
          id: 'donor1',
          name: 'Mike Chen',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        }
      },
      {
        id: 'don2', 
        amount: 25,
        message: 'Education should be accessible to everyone.',
        anonymous: false,
        createdAt: '2024-01-09T15:30:00Z',
        donor: {
          id: 'donor2',
          name: 'Lisa Park',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
        }
      }
    ],
    comments: [
      {
        id: 'comm1',
        content: 'This is such an important cause. I remember struggling to buy textbooks myself.',
        createdAt: '2024-01-08T12:00:00Z',
        author: {
          id: 'user3',
          name: 'Alex Rodriguez',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        }
      }
    ],
    createdAt: '2024-01-05T00:00:00Z'
  }
];

export const demoCategories = [
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