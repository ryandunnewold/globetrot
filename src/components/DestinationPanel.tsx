'use client';

import Image from 'next/image';
import StayCard from './StayCard';
import FlightSearch from './FlightSearch';
import type { Destination } from '@/lib/destinations';

interface DestinationPanelProps {
  destination: Destination | null;
  isVisible: boolean;
  onClose: () => void;
}

export default function DestinationPanel({
  destination,
  isVisible,
  onClose,
}: DestinationPanelProps) {
  if (!destination) return null;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 md:right-auto md:bottom-auto md:top-0 md:w-96
        bg-black/60 backdrop-blur-xl border border-white/10
        rounded-t-2xl md:rounded-l-none
        transition-transform duration-500 ease-out z-50
        ${isVisible ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:-translate-x-full'}
        max-h-[80vh] overflow-y-auto
      `}
    >
      {/* Hero Image */}
      <div className="relative w-full h-64 md:h-48 flex-shrink-0">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full p-2 hover:bg-black/80 transition-colors"
          aria-label="Close panel"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 md:p-5 space-y-4">
        {/* Destination Name */}
        <div>
          <h1 className="display-text text-3xl md:text-2xl font-display font-bold mb-1">
            {destination.name}
          </h1>
          <p className="text-white/60">{destination.country}</p>
        </div>

        {/* Tagline */}
        <p className="display-text-italic text-lg text-white/80">{destination.tagline}</p>

        {/* Vibe Tags */}
        <div className="flex flex-wrap gap-2">
          {destination.vibe.map((v) => (
            <span
              key={v}
              className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white/80"
            >
              {v}
            </span>
          ))}
        </div>

        {/* Best Time */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Best Time to Visit</p>
          <p className="text-white">{destination.bestTime}</p>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed">{destination.description}</p>

        {/* Stays Section */}
        <div className="pt-4">
          <h2 className="text-lg font-display font-semibold text-white mb-4">Stays</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
            {destination.stays.map((stay) => (
              <StayCard key={stay.name} stay={stay} />
            ))}
          </div>
        </div>

        {/* Experiences Section */}
        <div className="pt-4">
          <h2 className="text-lg font-display font-semibold text-white mb-3">Experiences</h2>
          <ul className="space-y-2">
            {destination.experiences.map((exp) => (
              <li key={exp} className="flex items-start gap-3 text-white/70 text-sm">
                <span className="text-white/40 mt-1">•</span>
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Flight Search Section */}
        <FlightSearch destination={destination} />

        {/* Close Button (Mobile) */}
        <button
          onClick={onClose}
          className="w-full md:hidden mt-6 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
        >
          Spin Again
        </button>
      </div>
    </div>
  );
}
