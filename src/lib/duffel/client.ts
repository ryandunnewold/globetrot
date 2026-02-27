/**
 * Duffel API Client
 * Provides authenticated access to Duffel API using stored token
 */

export function getDuffelToken(): string {
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  if (!token) {
    throw new Error('DUFFEL_ACCESS_TOKEN environment variable is not set');
  }
  return token;
}

export interface DuffelRequest {
  method: string;
  url: string;
  body?: unknown;
}

export async function makeDuffelRequest<T>(request: DuffelRequest): Promise<T> {
  const token = getDuffelToken();

  const response = await fetch(`https://api.duffel.com${request.url}`, {
    method: request.method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Duffel-Version': 'v2',
    },
    body: request.body ? JSON.stringify(request.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Duffel API error: ${error.message || response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export default getDuffelToken;
