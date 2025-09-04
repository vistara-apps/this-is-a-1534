import React, { useState } from 'react';
import { useCampaignData } from '../hooks/useCampaignData';
import { BarChart3, TrendingUp, Eye, Heart, Share, MessageCircle, Instagram, Camera } from 'lucide-react';

export function AnalyticsTab() {
  const [timeRange, setTimeRange] = useState('7d');
  const { getAnalyticsData, getAllAds, loading } = useCampaignData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const analytics = getAnalyticsData();
  const allAds = getAllAds();
  
  // Find top performing ad
  const topAd = allAds.reduce((best, current) => {
    const currentScore = (current.metrics?.impressions || 0) + (current.metrics?.likes || 0) * 2;
    const bestScore = (best?.metrics?.impressions || 0) + (best?.metrics?.likes || 0) * 2;
    return currentScore > bestScore ? current : best;
  }, null);

  // Generate mock chart data for demo
  const chartData = [
    { day: 'Mon', impressions: Math.floor(analytics.totalMetrics.impressions * 0.12), engagement: 8.1 },
    { day: 'Tue', impressions: Math.floor(analytics.totalMetrics.impressions * 0.18), engagement: 9.3 },
    { day: 'Wed', impressions: Math.floor(analytics.totalMetrics.impressions * 0.14), engagement: 7.8 },
    { day: 'Thu', impressions: Math.floor(analytics.totalMetrics.impressions * 0.16), engagement: 10.2 },
    { day: 'Fri', impressions: Math.floor(analytics.totalMetrics.impressions * 0.20), engagement: 11.5 },
    { day: 'Sat', impressions: Math.floor(analytics.totalMetrics.impressions * 0.10), engagement: 6.9 },
    { day: 'Sun', impressions: Math.floor(analytics.totalMetrics.impressions * 0.10), engagement: 6.2 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-textPrimary mb-2">Analytics Dashboard</h2>
            <p className="text-textSecondary">Track your ad performance and engagement</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="mt-4 sm:mt-0 px-4 py-2 border border-textSecondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Total Impressions</p>
              <p className="text-2xl font-bold text-textPrimary">{analytics.totalMetrics.impressions.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">+12.5%</span>
            <span className="text-textSecondary text-sm ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Total Likes</p>
              <p className="text-2xl font-bold text-textPrimary">{analytics.totalMetrics.likes.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">+8.3%</span>
            <span className="text-textSecondary text-sm ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Total Shares</p>
              <p className="text-2xl font-bold text-textPrimary">{analytics.totalMetrics.shares.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Share className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">+15.7%</span>
            <span className="text-textSecondary text-sm ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Engagement Rate</p>
              <p className="text-2xl font-bold text-textPrimary">{analytics.engagementRate}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">+2.1%</span>
            <span className="text-textSecondary text-sm ml-1">vs last period</span>
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold text-textPrimary mb-6">Platform Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(analytics.platformBreakdown).map(([platform, count]) => (
              <div key={platform} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {platform === 'instagram' ? (
                    <Instagram className="w-5 h-5 text-pink-500" />
                  ) : (
                    <Camera className="w-5 h-5 text-black" />
                  )}
                  <span className="font-medium text-textPrimary capitalize">{platform}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-textPrimary">{count} ads</div>
                  <div className="text-sm text-textSecondary">
                    {analytics.totalAds > 0 ? Math.round((count / analytics.totalAds) * 100) : 0}%
                  </div>
                </div>
              </div>
            ))}
            {Object.keys(analytics.platformBreakdown).length === 0 && (
              <div className="text-center py-8 text-textSecondary">
                No platform data available
              </div>
            )}
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold text-textPrimary mb-6">Daily Performance</h3>
          <div className="grid grid-cols-7 gap-2 h-48">
            {chartData.map((data, index) => {
              const maxImpressions = Math.max(...chartData.map(d => d.impressions));
              const height = maxImpressions > 0 ? (data.impressions / maxImpressions) * 100 : 0;
              
              return (
                <div key={data.day} className="flex flex-col items-center">
                  <div className="flex-1 flex items-end mb-2">
                    <div
                      className="w-6 bg-gradient-to-t from-primary to-primary/60 rounded-t-md transition-all duration-500 hover:from-primary/80 hover:to-primary/40"
                      style={{ height: `${height}%` }}
                      title={`${data.impressions.toLocaleString()} impressions`}
                    />
                  </div>
                  <div className="text-xs font-medium text-textSecondary">{data.day}</div>
                  <div className="text-xs text-textSecondary">{data.impressions.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Performing Ads */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-textPrimary mb-6">Top Performing Ads</h3>
        <div className="space-y-4">
          {allAds.length > 0 ? (
            allAds
              .filter(ad => ad.posted && ad.metrics)
              .sort((a, b) => {
                const scoreA = (a.metrics.impressions || 0) + (a.metrics.likes || 0) * 2;
                const scoreB = (b.metrics.impressions || 0) + (b.metrics.likes || 0) * 2;
                return scoreB - scoreA;
              })
              .slice(0, 3)
              .map((ad, index) => {
                const engagementRate = ad.metrics.impressions > 0 
                  ? (((ad.metrics.likes || 0) + (ad.metrics.shares || 0) + (ad.metrics.comments || 0)) / ad.metrics.impressions * 100).toFixed(1)
                  : 0;
                
                return (
                  <div key={ad.id} className="flex items-center justify-between p-4 border border-textSecondary/10 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg overflow-hidden">
                        <img 
                          src={ad.imageUrl} 
                          alt={ad.headline}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-textPrimary">{ad.headline}</p>
                        <p className="text-sm text-textSecondary capitalize">{ad.platform} • {ad.campaignName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-textPrimary">{(ad.metrics.impressions || 0).toLocaleString()}</p>
                      <p className="text-sm text-textSecondary">{engagementRate}% engagement</p>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="text-center py-8 text-textSecondary">
              No posted ads available for analysis
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
