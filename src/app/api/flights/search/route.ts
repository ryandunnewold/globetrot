import { NextRequest, NextResponse } from 'next/server';
import { searchFlights } from '@/lib/duffel/search';

interface FlightSearchRequest {
  originIata: string;
  destinationIata: string;
  date: string;
  cabinClass?: 'economy' | 'business' | 'first';
}

export async function POST(request: NextRequest) {
  try {
    const body: FlightSearchRequest = await request.json();

    // Validate required fields
    if (!body.originIata || !body.destinationIata || !body.date) {
      return NextResponse.json(
        {
          error: 'Missing required fields: originIata, destinationIata, date',
        },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // Search for flights
    const offers = await searchFlights({
      originIata: body.originIata,
      destinationIata: body.destinationIata,
      date: body.date,
      cabinClass: body.cabinClass || 'economy',
    });

    return NextResponse.json({
      data: offers,
      count: offers.length,
    });
  } catch (error) {
    console.error('Flight search error:', error);

    // Don't expose error details to client
    const message =
      error instanceof Error ? error.message : 'Failed to search flights';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
