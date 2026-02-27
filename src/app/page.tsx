'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  CONTINENTS,
  countriesByContinent,
  getStats,
  getGlobalStats,
  type Continent,
} from '@/lib/countries';
import { useVisited } from '@/hooks/useVisited';

// Dynamically import map to avoid SSR issues
const WorldMap = dynamic(() => import('@/components/WorldMap'), { ssr: false });

type Tab = Continent | 'All';

const CONTINENT_EMOJIS: Record<Tab, string> = {
  All: '🌍',
  Europe: '🏰',
  Asia: '🏯',
  Africa: '🌍',
  'North America': '🗽',
  'South America': '🏔️',
  Oceania: '🦘',
  Antarctica: '🧊',
};

const CONTINENT_SHORT: Record<Tab, string> = {
  All: 'All',
  Europe: 'Europe',
  Asia: 'Asia',
  Africa: 'Africa',
  'North America': 'N. America',
  'South America': 'S. America',
  Oceania: 'Oceania',
  Antarctica: 'Antarctica',
};

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700">
      <div
        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [showMap, setShowMap] = useState(true);
  const { visited, toggle, isVisited, hydrated } = useVisited();

  const globalStats = getGlobalStats(visited);

  const allTabs: Tab[] = ['All', ...CONTINENTS];

  const continentsToShow: Continent[] =
    activeTab === 'All' ? CONTINENTS : [activeTab as Continent];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="flex-none border-b border-slate-800 bg-slate-950 px-6 py-4">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">GlobeTrot</h1>
              <p className="text-xs text-slate-500">Track your travels around the world</p>
            </div>
          </div>

          {/* Global stats pill */}
          <div className="flex items-center gap-6">
            <div className="hidden gap-6 sm:flex">
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-400">{globalStats.visited}</div>
                <div className="text-xs text-slate-500">Visited</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-400">{globalStats.notYet}</div>
                <div className="text-xs text-slate-500">To Go</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{globalStats.percentage}%</div>
                <div className="text-xs text-slate-500">World</div>
              </div>
            </div>

            <button
              onClick={() => setShowMap((v) => !v)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>
        </div>

        {/* Global progress bar */}
        <div className="mx-auto mt-3 max-w-screen-2xl">
          <div className="flex items-center gap-3">
            <ProgressBar percentage={globalStats.percentage} />
            <span className="flex-none text-xs text-slate-500">
              {globalStats.visited}/{globalStats.total} countries
            </span>
          </div>
        </div>
      </header>

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <nav className="flex-none overflow-x-auto border-b border-slate-800 bg-slate-900 px-4">
        <div className="flex gap-1 py-2">
          {allTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-none rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className="mr-1.5">{CONTINENT_EMOJIS[tab]}</span>
              {CONTINENT_SHORT[tab]}
              {tab !== 'All' && (
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    activeTab === tab
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {getStats(tab as Continent, visited).visited}/
                  {getStats(tab as Continent, visited).total}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="flex flex-1 overflow-hidden">
        {/* Map panel */}
        {showMap && (
          <div className="flex-1 border-r border-slate-800 bg-slate-900">
            <WorldMap
              visited={visited}
              activeContinent={activeTab}
              onToggle={toggle}
            />
          </div>
        )}

        {/* Country list panel */}
        <div
          className={`flex flex-col overflow-hidden bg-slate-950 ${
            showMap ? 'w-80 flex-none xl:w-96' : 'flex-1'
          }`}
        >
          <div className="flex-1 overflow-y-auto p-4">
            {continentsToShow.map((continent) => {
              const countries = countriesByContinent(continent);
              const stats = getStats(continent, visited);

              return (
                <div key={continent} className="mb-6">
                  {/* Continent header */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{CONTINENT_EMOJIS[continent]}</span>
                      <h2 className="text-sm font-semibold text-slate-200">{continent}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="text-emerald-400 font-medium">{stats.visited}</span>
                      <span>/</span>
                      <span>{stats.total}</span>
                      <span className="text-blue-400 font-medium">{stats.percentage}%</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <ProgressBar percentage={stats.percentage} />
                  </div>

                  {/* Stats row */}
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-slate-900 px-2 py-1.5 text-center">
                      <div className="text-base font-bold text-emerald-400">{stats.visited}</div>
                      <div className="text-[10px] text-slate-500">Visited</div>
                    </div>
                    <div className="rounded-lg bg-slate-900 px-2 py-1.5 text-center">
                      <div className="text-base font-bold text-slate-400">{stats.notYet}</div>
                      <div className="text-[10px] text-slate-500">To Go</div>
                    </div>
                    <div className="rounded-lg bg-slate-900 px-2 py-1.5 text-center">
                      <div className="text-base font-bold text-blue-400">{stats.percentage}%</div>
                      <div className="text-[10px] text-slate-500">Done</div>
                    </div>
                  </div>

                  {/* Country list */}
                  <div className="space-y-0.5">
                    {countries.map((country) => {
                      const checked = hydrated && isVisited(country.isoNumeric);
                      return (
                        <label
                          key={country.isoNumeric}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors ${
                            checked
                              ? 'bg-emerald-950/50 hover:bg-emerald-950/70'
                              : 'hover:bg-slate-900'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggle(country.isoNumeric)}
                            className="h-4 w-4 flex-none cursor-pointer rounded accent-emerald-500"
                          />
                          <span
                            className={`text-sm transition-colors ${
                              checked ? 'text-emerald-300' : 'text-slate-300'
                            }`}
                          >
                            {country.name}
                          </span>
                          {checked && (
                            <span className="ml-auto text-xs text-emerald-500">✓</span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
