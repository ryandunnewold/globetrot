'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import type { Destination } from '@/lib/destinations';

// Dynamically import react-globe.gl with no SSR
const GlobeGl = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-900" />,
});

interface GlobeRef {
  flyTo: (lat: number, lng: number, altitude?: number, transitionDuration?: number) => void;
  setAutoRotateSpeed: (speed: number) => void;
}

interface GlobeProps {
  destination: Destination | null;
}

const Globe = forwardRef<GlobeRef, GlobeProps>(({ destination }, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeEl = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const autoRotateSpeedRef = useRef(0.5);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && globeEl.current) {
      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = autoRotateSpeedRef.current;
      }
    }
  }, [isClient]);

  useImperativeHandle(ref, () => ({
    flyTo: (lat: number, lng: number, altitude = 1.8, transitionDuration = 2500) => {
      if (globeEl.current) {
        globeEl.current.pointOfView(
          { lat, lng, altitude },
          transitionDuration
        );
      }
    },
    setAutoRotateSpeed: (speed: number) => {
      autoRotateSpeedRef.current = speed;
      if (globeEl.current) {
        const controls = globeEl.current.controls();
        if (controls) {
          controls.autoRotate = speed !== 0;
          controls.autoRotateSpeed = speed;
        }
      }
    },
  }));

  // Update points data based on destination
  const pointsData = destination
    ? [
        {
          lat: destination.lat,
          lng: destination.lng,
          size: 0.5,
          color: '#ff6b6b',
        },
      ]
    : [];

  if (!isClient) {
    return <div className="w-screen h-screen bg-gray-900" />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <GlobeGl
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        atmosphereColor="#ffffff"
        pointsData={pointsData}
        pointColor={() => '#ff6b6b'}
        width={typeof window !== 'undefined' ? window.innerWidth : 1000}
        height={typeof window !== 'undefined' ? window.innerHeight : 1000}
      />
    </div>
  );
});

Globe.displayName = 'Globe';

export default Globe;
export type { GlobeRef };
