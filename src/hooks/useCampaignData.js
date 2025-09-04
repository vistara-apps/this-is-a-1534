import { useState, useEffect } from 'react';

const STORAGE_KEY = 'adspark_campaigns';

export function useCampaignData() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load campaigns from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCampaigns(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save campaigns to localStorage whenever campaigns change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
      } catch (error) {
        console.error('Error saving campaigns:', error);
      }
    }
  }, [campaigns, loading]);

  const saveCampaign = (campaignData) => {
    const newCampaign = {
      id: `campaign-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...campaignData,
    };
    
    setCampaigns(prev => [newCampaign, ...prev]);
    return newCampaign;
  };

  const updateCampaign = (campaignId, updates) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, ...updates, updatedAt: new Date().toISOString() }
          : campaign
      )
    );
  };

  const deleteCampaign = (campaignId) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
  };

  const getCampaign = (campaignId) => {
    return campaigns.find(campaign => campaign.id === campaignId);
  };

  const getAllAds = () => {
    return campaigns.flatMap(campaign => 
      (campaign.ads || []).map(ad => ({
        ...ad,
        campaignId: campaign.id,
        campaignName: campaign.name || 'Untitled Campaign'
      }))
    );
  };

  const getAnalyticsData = () => {
    const allAds = getAllAds();
    const totalAds = allAds.length;
    const postedAds = allAds.filter(ad => ad.posted).length;
    
    const totalMetrics = allAds.reduce((acc, ad) => {
      if (ad.metrics) {
        acc.impressions += ad.metrics.impressions || 0;
        acc.likes += ad.metrics.likes || 0;
        acc.shares += ad.metrics.shares || 0;
        acc.comments += ad.metrics.comments || 0;
      }
      return acc;
    }, { impressions: 0, likes: 0, shares: 0, comments: 0 });

    const platformBreakdown = allAds.reduce((acc, ad) => {
      acc[ad.platform] = (acc[ad.platform] || 0) + 1;
      return acc;
    }, {});

    return {
      totalAds,
      postedAds,
      totalCampaigns: campaigns.length,
      totalMetrics,
      platformBreakdown,
      engagementRate: totalMetrics.impressions > 0 
        ? ((totalMetrics.likes + totalMetrics.shares + totalMetrics.comments) / totalMetrics.impressions * 100).toFixed(2)
        : 0
    };
  };

  return {
    campaigns,
    loading,
    saveCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaign,
    getAllAds,
    getAnalyticsData
  };
}
