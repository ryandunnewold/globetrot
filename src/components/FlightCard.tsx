'use client';

import type { FlightOffer } from '@/lib/duffel/search';

interface FlightCardProps {
  offer: FlightOffer;
}

function getStopCount(offer: FlightOffer): number {
  if (!offer.slices || offer.slices.length === 0) return 0;
  return offer.slices[0].segments.length - 1;
}

function getStopColor(stops: number): string {
  if (stops === 0) return 'bg-green-500/20 border-green-500/30';
  if (stops === 1) return 'bg-yellow-500/20 border-yellow-500/30';
  return 'bg-orange-500/20 border-orange-500/30';
}

function getStopLabel(stops: number): string {
  return stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`;
}

export default function FlightCard({ offer }: FlightCardProps) {
  if (!offer.slices || offer.slices.length === 0) return null;

  const slice = offer.slices[0];
  const segments = slice.segments;
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  const departureTime = new Date(firstSegment.departing_at);
  const arrivalTime = new Date(lastSegment.arriving_at);

  // Calculate duration
  const durationMs = arrivalTime.getTime() - departureTime.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  const stops = getStopCount(offer);
  const stopColor = getStopColor(stops);
  const stopLabel = getStopLabel(stops);

  const airline = firstSegment.operating_carrier?.name || offer.owner?.name || 'Unknown Airline';
  const price = parseFloat(offer.total_amount).toFixed(2);

  return (
    <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors">
      {/* Airline Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{airline}</p>
        <p className="text-xs text-white/50">{airline.charAt(0)}</p>
      </div>

      {/* Departure Time */}
      <div className="flex-1 text-center px-4">
        <p className="text-lg font-semibold text-white">
          {departureTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p className="text-xs text-white/50">Depart</p>
      </div>

      {/* Duration */}
      <div className="flex-1 text-center px-4">
        <p className="text-sm text-white/70">
          {hours}h {minutes}m
        </p>
        <p className={`text-xs px-2 py-1 rounded border inline-block ${stopColor}`}>
          {stopLabel}
        </p>
      </div>

      {/* Arrival Time */}
      <div className="flex-1 text-center px-4">
        <p className="text-lg font-semibold text-white">
          {arrivalTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p className="text-xs text-white/50">Arrive</p>
      </div>

      {/* Price & Button */}
      <div className="flex-1 text-right pl-4">
        <p className="text-xl font-bold text-white mb-2">
          ${price}
        </p>
        <a
          href={`https://www.duffel.com/search?offer_id=${offer.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-xs font-semibold text-white transition-colors"
        >
          View Deal
        </a>
      </div>
    </div>
  );
}
