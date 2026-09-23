import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeatureStrip } from '../components/home/FeatureStrip';
import { ContactCard } from '../components/home/ContactCard';

interface HomePageProps {
  onNavigate: (hash: string) => void;
  flashContact?: number;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, flashContact }) => (
  <div className="w-full flex flex-col items-center">
    <Hero onNavigate={onNavigate} />
    <FeatureStrip />
    <ContactCard flashKey={flashContact} />
  </div>
);
