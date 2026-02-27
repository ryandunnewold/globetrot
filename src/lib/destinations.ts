export interface Stay {
  name: string;
  type: string;
  description: string;
  image: string;
  priceNote: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  iataCode: string;
  lat: number;
  lng: number;
  tagline: string;
  description: string;
  vibe: string[];
  bestTime: string;
  heroImage: string;
  stays: Stay[];
  experiences: string[];
}

// Import the destinations data
import destinationsData from '../../public/data/destinations.json';

const destinations: Destination[] = destinationsData;

let lastDestinationId: string | null = null;

/**
 * Returns a random destination, ensuring it's never the same as the previous one
 */
export function getRandomDestination(): Destination {
  let destination: Destination;

  do {
    const randomIndex = Math.floor(Math.random() * destinations.length);
    destination = destinations[randomIndex];
  } while (lastDestinationId === destination.id && destinations.length > 1);

  lastDestinationId = destination.id;
  return destination;
}

/**
 * Get a specific destination by ID
 */
export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

/**
 * Get all destinations
 */
export function getAllDestinations(): Destination[] {
  return destinations;
}

export default destinations;
