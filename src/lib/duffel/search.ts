import { makeDuffelRequest } from './client';

export interface FlightSearchInput {
  originIata: string;
  destinationIata: string;
  date: string;
  cabinClass?: 'economy' | 'business' | 'first';
}

export interface FlightOffer {
  id: string;
  total_amount: string;
  total_currency: string;
  owner: { name: string };
  slices: Array<{
    segments: Array<{
      departing_at: string;
      arriving_at: string;
      operating_carrier?: { name?: string };
    }>;
  }>;
}

interface DuffelOfferRequestResponse {
  data: {
    id: string;
    offers: FlightOffer[];
  };
}

export async function searchFlights(input: FlightSearchInput): Promise<FlightOffer[]> {
  try {
    const response = await makeDuffelRequest<DuffelOfferRequestResponse>({
      method: 'POST',
      url: '/air/offer_requests',
      body: {
        data: {
          slices: [
            {
              origin: input.originIata,
              destination: input.destinationIata,
              departure_date: input.date,
            },
          ],
          passengers: [{ type: 'adult' }],
          cabin_class: input.cabinClass || 'economy',
        },
      },
    });

    // Return top 5 offers sorted by price
    const offers = (response.data.offers || [])
      .sort((a: FlightOffer, b: FlightOffer) => {
        const priceA = parseFloat(a.total_amount);
        const priceB = parseFloat(b.total_amount);
        return priceA - priceB;
      })
      .slice(0, 5);

    return offers;
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
}

export default searchFlights;
