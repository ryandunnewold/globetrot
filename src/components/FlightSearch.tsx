'use client';

import { useState } from 'react';
import FlightCard from './FlightCard';
import type { FlightOffer } from '@/lib/duffel/search';
import type { Destination } from '@/lib/destinations';

interface FlightSearchProps {
  destination: Destination;
}

interface PlaceSuggestion {
  iataCode: string;
  name: string;
}

export default function FlightSearch({ destination }: FlightSearchProps) {
  const [originIata, setOriginIata] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [cabinClass, setCabinClass] = useState<'economy' | 'business' | 'first'>('economy');
  const [isLoading, setIsLoading] = useState(false);
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleOriginChange = async (value: string) => {
    setOriginIata(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`/api/flights/places?q=${encodeURIComponent(value)}`);
      const data = await response.json();
      setSuggestions(data.data || []);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: PlaceSuggestion) => {
    setOriginIata(suggestion.iataCode);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = async () => {
    if (!originIata || !searchDate) {
      setError('Please enter departure city and date');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOffers([]);

    try {
      const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originIata,
          destinationIata: destination.iataCode,
          date: searchDate,
          cabinClass,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to search flights');
      }

      if (data.data && data.data.length > 0) {
        setOffers(data.data);
      } else {
        setError('No flights found — try another date');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search flights');
    } finally {
      setIsLoading(false);
    }
  };

  // Minimum date is today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-6 border-t border-white/10 space-y-4">
      <h2 className="text-lg font-display font-semibold text-white">Flight Search</h2>

      {/* Origin City */}
      <div className="relative">
        <label className="block text-xs text-white/60 mb-2">Departure City</label>
        <input
          type="text"
          value={originIata}
          onChange={(e) => handleOriginChange(e.target.value)}
          onFocus={() => originIata.length >= 2 && setShowSuggestions(true)}
          placeholder="Enter city or airport code"
          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/20"
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-black/80 border border-white/10 rounded max-h-40 overflow-y-auto z-10">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.iataCode}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors"
              >
                {suggestion.name} ({suggestion.iataCode})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Picker */}
      <div>
        <label className="block text-xs text-white/60 mb-2">Departure Date</label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          min={today}
          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-white/20"
        />
      </div>

      {/* Cabin Class */}
      <div>
        <label className="block text-xs text-white/60 mb-2">Cabin Class</label>
        <select
          value={cabinClass}
          onChange={(e) => setCabinClass(e.target.value as 'economy' | 'business' | 'first')}
          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-white/20"
        >
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 border border-white/20 rounded text-white font-semibold transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Searching...' : 'Search Flights'}
      </button>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Results */}
      {offers.length > 0 && (
        <div className="space-y-3 mt-6">
          <p className="text-sm text-white/60">{offers.length} flights found</p>
          {offers.map((offer) => (
            <FlightCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}

      {!isLoading && !error && offers.length === 0 && originIata && searchDate && (
        <div className="text-center py-8 text-white/50">
          <p>Click "Search Flights" to see available options</p>
        </div>
      )}
    </div>
  );
}
