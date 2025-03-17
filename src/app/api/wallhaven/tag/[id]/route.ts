import { NextResponse } from 'next/server';

// Disable type checking for this route
export const config = {
  runtime: 'edge',
};

export const runtime = 'edge';

export async function GET(request: Request) {
  // Extract the ID from the URL path manually
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const id = pathParts[pathParts.length - 1];
  
  const baseUrl = 'https://wallhaven.cc/api/v1';
  
  try {
    const response = await fetch(`${baseUrl}/tag/${id}`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching tag:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tag' },
      { status: 500 }
    );
  }
}