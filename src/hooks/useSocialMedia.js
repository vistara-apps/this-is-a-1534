import { useState } from 'react';

export function useSocialMedia() {
  const [isPosting, setIsPosting] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState({
    instagram: null,
    tiktok: null
  });

  // Simulate OAuth connection to social media platforms
  const connectAccount = async (platform) => {
    setIsPosting(true);
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAccount = {
        id: `${platform}_${Date.now()}`,
        username: `test_${platform}_account`,
        platform,
        connectedAt: new Date().toISOString(),
        isTestAccount: true
      };

      setConnectedAccounts(prev => ({
        ...prev,
        [platform]: mockAccount
      }));

      return mockAccount;
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error);
      throw error;
    } finally {
      setIsPosting(false);
    }
  };

  const disconnectAccount = (platform) => {
    setConnectedAccounts(prev => ({
      ...prev,
      [platform]: null
    }));
  };

  // Simulate posting an ad to social media
  const postAd = async (ad, platform) => {
    setIsPosting(true);
    try {
      const account = connectedAccounts[platform];
      if (!account) {
        throw new Error(`No ${platform} account connected`);
      }

      // Simulate API call to post ad
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate mock post URL and initial metrics
      const postUrl = `https://${platform}.com/p/${Math.random().toString(36).substr(2, 9)}`;
      const initialMetrics = {
        impressions: Math.floor(Math.random() * 1000) + 100,
        likes: Math.floor(Math.random() * 100) + 10,
        shares: Math.floor(Math.random() * 20) + 2,
        comments: Math.floor(Math.random() * 30) + 5
      };

      return {
        postUrl,
        metrics: initialMetrics,
        postedAt: new Date().toISOString(),
        platform,
        accountId: account.id
      };
    } catch (error) {
      console.error(`Error posting to ${platform}:`, error);
      throw error;
    } finally {
      setIsPosting(false);
    }
  };

  // Simulate fetching updated metrics for a posted ad
  const fetchMetrics = async (postUrl, platform) => {
    try {
      // Simulate API call to fetch metrics
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate updated metrics (simulate growth)
      const growthFactor = 1 + (Math.random() * 0.5); // 0-50% growth
      return {
        impressions: Math.floor((Math.random() * 2000 + 500) * growthFactor),
        likes: Math.floor((Math.random() * 200 + 20) * growthFactor),
        shares: Math.floor((Math.random() * 50 + 5) * growthFactor),
        comments: Math.floor((Math.random() * 80 + 10) * growthFactor),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching metrics from ${platform}:`, error);
      throw error;
    }
  };

  // Get platform-specific posting guidelines
  const getPlatformGuidelines = (platform) => {
    const guidelines = {
      instagram: {
        imageSpecs: {
          aspectRatio: '1:1 or 4:5',
          minResolution: '1080x1080',
          maxFileSize: '30MB',
          formats: ['JPG', 'PNG']
        },
        copyLimits: {
          caption: 2200,
          hashtags: 30
        },
        bestPractices: [
          'Use high-quality, visually appealing images',
          'Include relevant hashtags',
          'Post during peak engagement hours (11am-1pm, 7pm-9pm)',
          'Use clear call-to-action'
        ]
      },
      tiktok: {
        videoSpecs: {
          aspectRatio: '9:16',
          duration: '15-60 seconds',
          maxFileSize: '287.6MB',
          formats: ['MP4', 'MOV']
        },
        copyLimits: {
          caption: 150,
          hashtags: 100
        },
        bestPractices: [
          'Create engaging hooks in first 3 seconds',
          'Use trending sounds and effects',
          'Keep content authentic and entertaining',
          'Post consistently for algorithm boost'
        ]
      }
    };

    return guidelines[platform] || null;
  };

  return {
    isPosting,
    connectedAccounts,
    connectAccount,
    disconnectAccount,
    postAd,
    fetchMetrics,
    getPlatformGuidelines
  };
}
