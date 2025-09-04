import React, { useState } from 'react';
import { Heart, Share, MessageCircle, TrendingUp, ExternalLink } from 'lucide-react';

export function AdCard({ ad, variant = 'default', onPost }) {
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    setIsPosting(true);
    try {
      await onPost?.(ad);
    } finally {
      setIsPosting(false);
    }
  };

  const formatMetric = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className="bg-surface rounded-lg shadow-card overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Image */}
      <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
        <img
          src={ad.imageUrl}
          alt={ad.headline}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {ad.posted && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Posted
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-textPrimary mb-2 line-clamp-2">
          {ad.headline}
        </h3>
        <p className="text-textSecondary text-sm mb-4 line-clamp-3">
          {ad.description}
        </p>

        {/* Metrics (if variant includes them or ad is posted) */}
        {(variant === 'withMetrics' || ad.posted) && ad.metrics && (
          <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-bg rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <div className="text-xs font-medium text-textPrimary">
                {formatMetric(ad.metrics.impressions)}
              </div>
              <div className="text-xs text-textSecondary">Views</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Heart className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-xs font-medium text-textPrimary">
                {formatMetric(ad.metrics.likes)}
              </div>
              <div className="text-xs text-textSecondary">Likes</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Share className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-xs font-medium text-textPrimary">
                {formatMetric(ad.metrics.shares)}
              </div>
              <div className="text-xs text-textSecondary">Shares</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <MessageCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-xs font-medium text-textPrimary">
                {formatMetric(ad.metrics.comments)}
              </div>
              <div className="text-xs text-textSecondary">Comments</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {!ad.posted ? (
            <button
              onClick={handlePost}
              disabled={isPosting}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPosting ? 'Posting...' : 'Post to Test Account'}
            </button>
          ) : (
            <button 
              onClick={() => ad.postUrl && window.open(ad.postUrl, '_blank')}
              className="flex-1 bg-accent text-white py-2 px-4 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
