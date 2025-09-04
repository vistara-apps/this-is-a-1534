import React, { useState } from 'react';
import { AppShell } from './components/AppShell';
import { GenerateTab } from './components/GenerateTab';
import { CampaignsTab } from './components/CampaignsTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { SettingsTab } from './components/SettingsTab';

function App() {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <AppShell activeTab={activeTab} setActiveTab={setActiveTab}>
      <MainContent activeTab={activeTab} />
    </AppShell>
  );
}

function MainContent({ activeTab }) {
  switch (activeTab) {
    case 'generate':
      return <GenerateTab />;
    case 'campaigns':
      return <CampaignsTab />;
    case 'analytics':
      return <AnalyticsTab />;
    case 'settings':
      return <SettingsTab />;
    default:
      return <GenerateTab />;
  }
}

export default App;
