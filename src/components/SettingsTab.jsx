import React, { useState } from 'react';
import { Instagram, Camera, Bell, CreditCard, User, Shield } from 'lucide-react';
import { Button } from './Button';

export function SettingsTab() {
  const [notifications, setNotifications] = useState({
    postSuccess: true,
    performanceAlerts: true,
    weeklyReports: false
  });

  const [connectedAccounts] = useState({
    instagram: { connected: true, username: '@test_account_ig' },
    tiktok: { connected: false, username: null }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h2 className="text-2xl font-bold text-textPrimary mb-2">Settings</h2>
        <p className="text-textSecondary">Manage your account preferences and integrations</p>
      </div>

      {/* Account Settings */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold text-textPrimary">Account Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Email</label>
            <input
              type="email"
              value="user@example.com"
              readOnly
              className="w-full p-3 border border-textSecondary/20 rounded-lg bg-bg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Display Name</label>
            <input
              type="text"
              placeholder="Your display name"
              className="w-full p-3 border border-textSecondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Social Media Connections */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold text-textPrimary">Social Media Connections</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-textSecondary/10 rounded-lg">
            <div className="flex items-center gap-3">
              <Instagram className="w-8 h-8 text-pink-500" />
              <div>
                <p className="font-medium text-textPrimary">Instagram Test Account</p>
                <p className="text-sm text-textSecondary">
                  {connectedAccounts.instagram.connected 
                    ? `Connected as ${connectedAccounts.instagram.username}`
                    : 'Not connected'
                  }
                </p>
              </div>
            </div>
            <Button
              variant={connectedAccounts.instagram.connected ? 'destructive' : 'secondary'}
            >
              {connectedAccounts.instagram.connected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-textSecondary/10 rounded-lg">
            <div className="flex items-center gap-3">
              <Camera className="w-8 h-8 text-black" />
              <div>
                <p className="font-medium text-textPrimary">TikTok Test Account</p>
                <p className="text-sm text-textSecondary">
                  {connectedAccounts.tiktok.connected 
                    ? `Connected as ${connectedAccounts.tiktok.username}`
                    : 'Not connected'
                  }
                </p>
              </div>
            </div>
            <Button variant="secondary">
              Connect
            </Button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            💡 <strong>Tip:</strong> Connect separate test accounts to avoid posting to your main social media profiles while testing ad performance.
          </p>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold text-textPrimary">Notification Preferences</h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-textPrimary">
                  {key === 'postSuccess' && 'Post Success Notifications'}
                  {key === 'performanceAlerts' && 'Performance Alerts'}
                  {key === 'weeklyReports' && 'Weekly Reports'}
                </p>
                <p className="text-sm text-textSecondary">
                  {key === 'postSuccess' && 'Get notified when your ads are successfully posted'}
                  {key === 'performanceAlerts' && 'Receive alerts about high-performing ads'}
                  {key === 'weeklyReports' && 'Weekly summary of your ad performance'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Billing */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold text-textPrimary">Billing & Usage</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-textSecondary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-sm text-textSecondary">Free generations remaining</p>
            </div>
            <div className="p-4 border border-textSecondary/10 rounded-lg">
              <p className="text-2xl font-bold text-textPrimary">15</p>
              <p className="text-sm text-textSecondary">Total ads generated</p>
            </div>
            <div className="p-4 border border-textSecondary/10 rounded-lg">
              <p className="text-2xl font-bold text-textPrimary">$12.00</p>
              <p className="text-sm text-textSecondary">Total spent</p>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              💳 Payments are processed securely through your connected crypto wallet. No credit card required!
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <Button className="w-full sm:w-auto">
          Save Settings
        </Button>
      </div>
    </div>
  );
}