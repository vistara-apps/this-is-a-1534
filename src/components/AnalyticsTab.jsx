import React, { useState } from 'react';
import { BarChart3, TrendingUp, Eye, Heart, Share, MessageCircle } from 'lucide-react';

export function AnalyticsTab() {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock analytics data
  const metrics = {
    totalImpressions: 45600,
    totalLikes: 3400,
    totalShares: 890,
    totalComments: 234,
    engagementRate: 9.2,
    topPerformer: 'Revolutionary Skincare Routine'
  };

  const chartData = [
    { day: 'Mon', impressions: 5200, engagement: 8.1 },
    { day: 'Tue', impressions: 7800, engagement: 9.3 },
    { day: 'Wed', impressions: 6400, engagement: 7.8 },
    { day: 'Thu', impressions: 8900, engagement: 10.2 },
    { day: 'Fri', impressions: 9100, engagement: 11.5 },
    { day: 'Sat', impressions: 4200, engagement: 6.9 },
    { day: 'Sun', impressions: 4000, engagement: 6.2 }
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
              <p className="text-2xl font-bold text-textPrimary">{metrics.totalImpressions.toLocaleString()}</p>
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
              <p className="text-2xl font-bold text-textPrimary">{metrics.totalLikes.toLocaleString()}</p>
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
              <p className="text-2xl font-bold text-textPrimary">{metrics.totalShares.toLocaleString()}</p>
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
              <p className="text-2xl font-bold text-textPrimary">{metrics.engagementRate}%</p>
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

      {/* Performance Chart */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-textPrimary mb-6">Daily Performance</h3>
        <div className="grid grid-cols-7 gap-4 h-64">
          {chartData.map((data, index) => {
            const maxImpressions = Math.max(...chartData.map(d => d.impressions));
            const height = (data.impressions / maxImpressions) * 100;
            
            return (
              <div key={data.day} className="flex flex-col items-center">
                <div className="flex-1 flex items-end mb-2">
                  <div
                    className="w-8 bg-gradient-to-t from-primary to-primary/60 rounded-t-md transition-all duration-500 hover:from-primary/80 hover:to-primary/40"
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

      {/* Top Performing Ads */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-textPrimary mb-6">Top Performing Ads</h3>
        <div className="space-y-4">
          {[
            { name: 'Revolutionary Skincare Routine', platform: 'Instagram', impressions: 15600, engagement: 11.2 },
            { name: 'Eco-Friendly Phone Case', platform: 'Instagram', impressions: 12500, engagement: 9.8 },
            { name: 'Best Coffee Beans Ever', platform: 'TikTok', impressions: 8900, engagement: 8.5 },
          ].map((ad, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-textSecondary/10 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg"></div>
                <div>
                  <p className="font-medium text-textPrimary">{ad.name}</p>
                  <p className="text-sm text-textSecondary">{ad.platform}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-textPrimary">{ad.impressions.toLocaleString()}</p>
                <p className="text-sm text-textSecondary">{ad.engagement}% engagement</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}