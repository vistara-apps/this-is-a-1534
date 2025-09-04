import React, { useState } from 'react';
import { UploadArea } from './UploadArea';
import { Button } from './Button';
import { AdCard } from './AdCard';
import { useAIGeneration } from '../hooks/useAIGeneration';
import { usePaymentContext } from '../hooks/usePaymentContext';
import { useCampaignData } from '../hooks/useCampaignData';
import { useSocialMedia } from '../hooks/useSocialMedia';
import { Sparkles, Instagram, Camera, AlertCircle } from 'lucide-react';

export function GenerateTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [generatedAds, setGeneratedAds] = useState([]);
  const [paid, setPaid] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  
  const { generateAdVariations, isGenerating } = useAIGeneration();
  const { createSession, isConnected } = usePaymentContext();
  const { saveCampaign, updateCampaign } = useCampaignData();
  const { postAd, isPosting, connectedAccounts, connectAccount } = useSocialMedia();

  const handleGenerate = async () => {
    if (!isConnected) {
      alert('Please connect your wallet to generate ads');
      return;
    }

    if (!paid) {
      try {
        await createSession('$1.00');
        setPaid(true);
      } catch (error) {
        alert('Payment failed. Please try again.');
        return;
      }
    }

    if (!selectedFile || !productDescription) {
      alert('Please upload an image and describe your product');
      return;
    }

    try {
      const ads = await generateAdVariations(productDescription, selectedPlatform, selectedFile);
      setGeneratedAds(ads);
      
      // Save campaign to localStorage
      const campaign = saveCampaign({
        name: campaignName || `${selectedPlatform} Campaign - ${new Date().toLocaleDateString()}`,
        productDescription,
        platform: selectedPlatform,
        productImage: selectedFile ? URL.createObjectURL(selectedFile) : null,
        ads: ads
      });
      
    } catch (error) {
      alert('Failed to generate ads. Please try again.');
    }
  };

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
      
      // Update ad status with real posting data
      const updatedAds = generatedAds.map(existingAd => 
        existingAd.id === ad.id 
          ? {
              ...existingAd,
              posted: true,
              postUrl: postResult.postUrl,
              postedAt: postResult.postedAt,
              metrics: postResult.metrics
            }
          : existingAd
      );
      setGeneratedAds(updatedAds);
      
    } catch (error) {
      alert(`Failed to post ad: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-textPrimary">Generate AI Ad Creatives</h2>
            <p className="text-textSecondary">Create 5 unique ad variations for $1.00</p>
          </div>
        </div>

        {!isConnected && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-amber-800">
              🔗 Connect your wallet to start generating AI-powered ad creatives
            </p>
          </div>
        )}
      </div>

      {/* Campaign Name */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">1. Campaign Name (Optional)</h3>
        <input
          type="text"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          placeholder="Enter a name for this campaign..."
          className="w-full p-4 border border-textSecondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Upload Section */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">2. Upload Product Image</h3>
        <UploadArea selectedFile={selectedFile} onFileSelect={setSelectedFile} />
      </div>

      {/* Product Description */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">3. Describe Your Product</h3>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Describe your product, its benefits, target audience, and any key features..."
          className="w-full h-32 p-4 border border-textSecondary/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Platform Selection */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">4. Choose Platform</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedPlatform('instagram')}
            className={`p-4 border-2 rounded-lg transition-all relative ${
              selectedPlatform === 'instagram'
                ? 'border-primary bg-primary/5'
                : 'border-textSecondary/20 hover:border-primary/50'
            }`}
          >
            <Instagram className="w-8 h-8 mx-auto mb-2 text-pink-500" />
            <div className="font-medium text-textPrimary">Instagram</div>
            <div className="text-sm text-textSecondary">Aesthetic, clear CTAs</div>
            {connectedAccounts.instagram && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setSelectedPlatform('tiktok')}
            className={`p-4 border-2 rounded-lg transition-all relative ${
              selectedPlatform === 'tiktok'
                ? 'border-primary bg-primary/5'
                : 'border-textSecondary/20 hover:border-primary/50'
            }`}
          >
            <Camera className="w-8 h-8 mx-auto mb-2 text-black" />
            <div className="font-medium text-textPrimary">TikTok</div>
            <div className="text-sm text-textSecondary">Short, punchy, trending</div>
            {connectedAccounts.tiktok && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
            )}
          </button>
        </div>
        
        {/* Connection Status */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <AlertCircle className="w-4 h-4" />
            <span>
              {connectedAccounts[selectedPlatform] 
                ? `✅ Connected to ${connectedAccounts[selectedPlatform].username}` 
                : `⚠️ ${selectedPlatform} test account not connected - you'll be prompted to connect when posting`
              }
            </span>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <Button
          onClick={handleGenerate}
          loading={isGenerating}
          disabled={!selectedFile || !productDescription || !isConnected}
          className="w-full py-4 text-lg"
        >
          <Sparkles className="w-5 h-5" />
          {paid ? 'Generate Ad Variations' : 'Pay $1.00 & Generate Ads'}
        </Button>
      </div>

      {/* Generated Ads */}
      {generatedAds.length > 0 && (
        <div className="bg-surface rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold text-textPrimary mb-6">Generated Ad Variations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedAds.map((ad) => (
              <AdCard
                key={ad.id}
                ad={ad}
                onPost={handlePostAd}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
