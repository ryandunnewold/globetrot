'use client';

import Image from 'next/image';
import type { Stay } from '@/lib/destinations';

interface StayCardProps {
  stay: Stay;
}

export default function StayCard({ stay }: StayCardProps) {
  return (
    <div className="flex-shrink-0 w-80 rounded-lg overflow-hidden bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={stay.image}
          alt={stay.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-display font-semibold text-white text-lg">{stay.name}</h3>
          <p className="text-xs text-white/50 uppercase tracking-wide">{stay.type}</p>
        </div>

        <p className="text-sm text-white/70 line-clamp-2">{stay.description}</p>

        <p className="text-sm font-semibold text-white/80">{stay.priceNote}</p>
      </div>
    </div>
  );
}
