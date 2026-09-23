import React, { useEffect } from 'react';
import { useHashRoute } from './hooks/useHashRoute';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { MediaPage } from './pages/MediaPage';
import { FounderPage } from './pages/FounderPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

export const App: React.FC = () => {
  const { route, navigate, flashContact } = useHashRoute();

  // Route-aware document title update
  useEffect(() => {
    switch (route) {
      case 'product':
        document.title = 'Cerebrocure Technologies - Product';
        break;
      case 'media':
        document.title = 'Cerebrocure Technologies - Media';
        break;
      case 'founder':
        document.title = 'Cerebrocure Technologies - Founder';
        break;
      case 'privacy':
        document.title = 'Cerebrocure Technologies - Privacy Policy';
        break;
      case 'home':
      default:
        document.title = 'Cerebrocure Technologies - Home';
        break;
    }
  }, [route]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-bg text-text">
      <Nav activeRoute={route} onNavigate={navigate} />

      <main className="flex-1 w-full">
        {route === 'home' && (
          <HomePage onNavigate={navigate} flashContact={flashContact} />
        )}
        {route === 'product' && <ProductPage onNavigate={navigate} />}
        {route === 'media' && <MediaPage />}
        {route === 'founder' && <FounderPage />}
        {route === 'privacy' && <PrivacyPolicyPage />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
