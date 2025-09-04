import React, { useState, useEffect } from 'react';
import { AdCard } from './AdCard';
import { Search, Filter, Calendar } from 'lucide-react';

export function CampaignsTab() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockCampaigns = [
      {
        id: 'ad-1',
        headline: '🔥 Revolutionary Skincare Routine',
        description: 'Transform your skin in just 7 days with our scientifically proven formula. Join thousands of satisfied customers!',
        imageUrl: 'https://picsum.photos/400/600?random=1',
        platform: 'instagram',
        createdAt: '2024-01-15T10:00:00Z',
        posted: true,
        metrics: {
          impressions: 12500,
          likes: 890,
          shares: 156,
          comments: 67
        }
      },
      {
        id: 'ad-2',
        headline: 'Best Coffee Beans Ever ☕',
        description: 'Premium single-origin coffee that will change your morning routine forever. Free shipping worldwide!',
        imageUrl: 'https://picsum.photos/400/600?random=2',
        platform: 'tiktok',
        createdAt: '2024-01-14T15:30:00Z',
        posted: true,
        metrics: {
          impressions: 8900,
          likes: 450,
          shares: 89,
          comments: 34
        }
      },
      {
        id: 'ad-3',
        headline: 'Wireless Earbuds That Actually Work',
        description: 'Crystal clear sound, 24-hour battery life, and perfect fit. The future of audio is here!',
        imageUrl: 'https://picsum.photos/400/600?random=3',
        platform: 'instagram',
        createdAt: '2024-01-13T09:15:00Z',
        posted: false,
        metrics: {
          impressions: 0,
          likes: 0,
          shares: 0,
          comments: 0
        }
      },
      {
        id: 'ad-4',
        headline: 'Eco-Friendly Phone Case 🌱',
        description: 'Protect your phone and the planet. Made from 100% recycled materials with military-grade protection.',
        imageUrl: 'https://picsum.photos/400/600?random=4',
        platform: 'instagram',
        createdAt: '2024-01-12T14:20:00Z',
        posted: true,
        metrics: {
          impressions: 15600,
          likes: 1200,
          shares: 234,
          comments: 89
        }
      }
    ];
    setCampaigns(mockCampaigns);
  }, []);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || campaign.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });

  const handlePostAd = async (ad) => {
    // Simulate posting
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === ad.id
          ? {
              ...campaign,
              posted: true,
              metrics: {
                impressions: Math.floor(Math.random() * 5000) + 1000,
                likes: Math.floor(Math.random() * 500) + 50,
                shares: Math.floor(Math.random() * 100) + 10,
                comments: Math.floor(Math.random() * 50) + 5
              }
            }
          : campaign
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">My Ad Campaigns</h2>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary w-5 h-5" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-textSecondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary w-5 h-5" />
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="pl-10 pr-8 py-2 border border-textSecondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-surface"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg p-4 shadow-card">
          <div className="text-2xl font-bold text-primary mb-1">
            {campaigns.length}
          </div>
          <div className="text-sm text-textSecondary">Total Ads</div>
        </div>
        <div className="bg-surface rounded-lg p-4 shadow-card">
          <div className="text-2xl font-bold text-green-500 mb-1">
            {campaigns.filter(c => c.posted).length}
          </div>
          <div className="text-sm text-textSecondary">Posted</div>
        </div>
        <div className="bg-surface rounded-lg p-4 shadow-card">
          <div className="text-2xl font-bold text-accent mb-1">
            {campaigns.reduce((sum, c) => sum + c.metrics.impressions, 0).toLocaleString()}
          </div>
          <div className="text-sm text-textSecondary">Total Views</div>
        </div>
        <div className="bg-surface rounded-lg p-4 shadow-card">
          <div className="text-2xl font-bold text-pink-500 mb-1">
            {campaigns.reduce((sum, c) => sum + c.metrics.likes, 0).toLocaleString()}
          </div>
          <div className="text-sm text-textSecondary">Total Likes</div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <AdCard
                key={campaign.id}
                ad={campaign}
                variant="withMetrics"
                onPost={handlePostAd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-textSecondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-textPrimary mb-2">No campaigns found</h3>
            <p className="text-textSecondary">
              {searchTerm || filterPlatform !== 'all' 
                ? 'Try adjusting your filters'
                : 'Create your first campaign to get started'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}