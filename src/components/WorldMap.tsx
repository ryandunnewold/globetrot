'use client';

import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { useState } from 'react';
import type { Continent } from '@/lib/countries';
import { COUNTRIES, countriesByContinent } from '@/lib/countries';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Build a lookup: numeric code → country name
const codeToName: Record<string, string> = {};
for (const c of COUNTRIES) {
  codeToName[c.isoNumeric] = c.name;
}
// Also map without leading zeros for world-atlas compatibility
const codeToNameAlt: Record<string, string> = {};
for (const c of COUNTRIES) {
  codeToNameAlt[String(parseInt(c.isoNumeric, 10))] = c.name;
}

interface WorldMapProps {
  visited: Set<string>;
  activeContinent: Continent | 'All';
  onToggle: (isoNumeric: string) => void;
}

export default function WorldMap({ visited, activeContinent, onToggle }: WorldMapProps) {
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);

  // Build the set of ISO numeric codes visible in the active continent filter
  const continentSet =
    activeContinent === 'All'
      ? new Set(COUNTRIES.map((c) => c.isoNumeric))
      : new Set(countriesByContinent(activeContinent as Continent).map((c) => c.isoNumeric));

  const getCountryCode = (geoId: string): string => {
    // world-atlas ids are numeric, may need zero-padding
    const padded = String(geoId).padStart(3, '0');
    return padded;
  };

  const getFill = (geoId: string) => {
    const code = getCountryCode(geoId);
    const inContinent = continentSet.has(code);
    const isVisited = visited.has(code);

    if (isVisited) return '#10b981'; // emerald-500 — visited
    if (inContinent && activeContinent !== 'All') return '#1e3a5f'; // highlighted continent
    return '#1a2744'; // default dark blue
  };

  return (
    <div className="relative w-full h-full select-none">
      <ComposableMap
        projection="geoNaturalEarth1"
        style={{ width: '100%', height: '100%' }}
        projectionConfig={{ scale: 147 }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoId = String(geo.id);
                const code = getCountryCode(geoId);
                const name = codeToName[code] ?? codeToNameAlt[geoId] ?? 'Unknown';
                const isTracked = COUNTRIES.some((c) => c.isoNumeric === code);
                const isVisited = visited.has(code);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getFill(geoId)}
                    stroke="#0f172a"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none', cursor: isTracked ? 'pointer' : 'default' },
                      hover: {
                        fill: isVisited ? '#059669' : isTracked ? '#2563eb' : '#233054',
                        outline: 'none',
                        cursor: isTracked ? 'pointer' : 'default',
                      },
                      pressed: { outline: 'none' },
                    }}
                    onClick={() => {
                      if (isTracked) onToggle(code);
                    }}
                    onMouseEnter={(e) => {
                      if (!isTracked) return;
                      const rect = (e.target as SVGElement)
                        .closest('svg')
                        ?.getBoundingClientRect();
                      setTooltip({
                        name,
                        x: e.clientX - (rect?.left ?? 0),
                        y: e.clientY - (rect?.top ?? 0),
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 rounded-lg bg-slate-800 border border-slate-600 px-3 py-1.5 text-sm text-white shadow-xl"
          style={{ left: tooltip.x + 12, top: tooltip.y - 32 }}
        >
          {tooltip.name}
        </div>
      )}

      <div className="absolute bottom-3 left-3 flex gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-emerald-500" />
          Visited
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-[#1a2744]" />
          Not yet
        </span>
      </div>
    </div>
  );
}
