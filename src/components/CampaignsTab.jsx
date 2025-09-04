import React, { useState, useEffect } from 'react';
import { AdCard } from './AdCard';
import { useCampaignData } from '../hooks/useCampaignData';
import { useSocialMedia } from '../hooks/useSocialMedia';
import { Search, Filter, Calendar, Trash2, FolderOpen } from 'lucide-react';

export function CampaignsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [selectedView, setSelectedView] = useState('ads'); // 'ads' or 'campaigns'
  
  const { campaigns, getAllAds, deleteCampaign, loading } = useCampaignData();
  const { postAd, isPosting, connectedAccounts, connectAccount } = useSocialMedia();

  // Get all ads from all campaigns
  const allAds = getAllAds();

  // Filter ads based on search and platform
  const filteredAds = allAds.filter(ad => {
    const matchesSearch = ad.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || ad.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });

  // Filter campaigns based on search
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostAd = async (ad) => {
    try {
      // Check if platform account is connected
      if (!connectedAccounts[ad.platform]) {
        const shouldConnect = window.confirm(
          `You need to connect your ${ad.platform} test account first. Connect now?`
        );
        if (shouldConnect) {
          await connectAccount(ad.platform);
        } else {
          return;
        }
      }

      // Post ad to social media
      const postResult = await postAd(ad, ad.platform);
      
      // Note: In a real app, you'd update the campaign data here
      // For now, the ad state is managed locally in GenerateTab
      
    } catch (error) {
      alert(`Failed to post ad: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }




  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">My Ad Campaigns</h2>
        
        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedView('ads')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'ads'
                ? 'bg-primary text-white'
                : 'bg-textSecondary/10 text-textSecondary hover:bg-textSecondary/20'
            }`}
          >
            All Ads ({allAds.length})
          </button>
          <button
            onClick={() => setSelectedView('campaigns')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'campaigns'
                ? 'bg-primary text-white'
                : 'bg-textSecondary/10 text-textSecondary hover:bg-textSecondary/20'
            }`}
          >
            Campaigns ({campaigns.length})
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary w-5 h-5" />
            <input
              type="text"
              placeholder={selectedView === 'ads' ? "Search ads..." : "Search campaigns..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-textSecondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {selectedView === 'ads' && (
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
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg p-4 shadow-card">
          <div className="text-2xl font-bold text-primary mb-1">
            {allAds.length}
          </div>
          <div className="text-sm text-textSecondary">Total Ads</div>
        </div>
        <div className="bg-surface rounded-lg p-4 shadow-card">
          <div className="text-2xl font-bold text-green-500 mb-1">
            {allAds.filter(ad => ad.posted).length}
          </div>
          <div className="text-sm text-textSecondary">Posted</div>
        </div>
        <div className="bg-surface rounded-lg p-4 shadow-card">
          <div className="text-2xl font-bold text-accent mb-1">
            {allAds.reduce((sum, ad) => sum + (ad.metrics?.impressions || 0), 0).toLocaleString()}
          </div>
          <div className="text-sm text-textSecondary">Total Views</div>
        </div>
        <div className="bg-surface rounded-lg p-4 shadow-card">
          <div className="text-2xl font-bold text-pink-500 mb-1">
            {allAds.reduce((sum, ad) => sum + (ad.metrics?.likes || 0), 0).toLocaleString()}
          </div>
          <div className="text-sm text-textSecondary">Total Likes</div>
        </div>
      </div>

      {/* Content Display */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        {selectedView === 'ads' ? (
          // Ads View
          filteredAds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAds.map((ad) => (
                <AdCard
                  key={ad.id}
                  ad={ad}
                  variant="withMetrics"
                  onPost={handlePostAd}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-textSecondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-textPrimary mb-2">No ads found</h3>
              <p className="text-textSecondary">
                {searchTerm || filterPlatform !== 'all' 
                  ? 'Try adjusting your filters'
                  : 'Generate your first ad campaign to get started'
                }
              </p>
            </div>
          )
        ) : (
          // Campaigns View
          filteredCampaigns.length > 0 ? (
            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="border border-textSecondary/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-textPrimary">{campaign.name}</h3>
                      <p className="text-sm text-textSecondary">
                        {new Date(campaign.createdAt).toLocaleDateString()} • {campaign.platform}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteCampaign(campaign.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete campaign"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-textSecondary mb-3">{campaign.productDescription}</p>
                  <div className="text-sm text-textPrimary">
                    {campaign.ads?.length || 0} ads • {campaign.ads?.filter(ad => ad.posted).length || 0} posted
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-textSecondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-textPrimary mb-2">No campaigns found</h3>
              <p className="text-textSecondary">
                {searchTerm 
                  ? 'Try adjusting your search'
                  : 'Create your first campaign to get started'
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
