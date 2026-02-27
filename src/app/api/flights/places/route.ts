import { NextRequest, NextResponse } from 'next/server';
import { makeDuffelRequest } from '@/lib/duffel/client';

interface DuffelPlace {
  id: string;
  name: string;
  iata_code: string;
  type: string;
}

interface DuffelPlacesResponse {
  data: DuffelPlace[];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Search for places using Duffel API
    const response = await makeDuffelRequest<DuffelPlacesResponse>({
      method: 'GET',
      url: `/places/suggestions?query=${encodeURIComponent(query)}`,
    });

    // Return top 10 suggestions
    const suggestions = (response.data || [])
      .slice(0, 10)
      .map((place) => ({
        id: place.id,
        name: place.name,
        iataCode: place.iata_code,
        type: place.type,
      }));

    return NextResponse.json({
      data: suggestions,
    });
  } catch (error) {
    console.error('Places search error:', error);

    const message =
      error instanceof Error ? error.message : 'Failed to search places';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
