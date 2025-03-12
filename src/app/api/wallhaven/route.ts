import { NextResponse } from 'next/server';

const BASE_URL = 'https://wallhaven.cc/api/v1';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = new URLSearchParams(searchParams).toString();
    
    const response = await fetch(`${BASE_URL}/search?${queryParams}`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from Wallhaven:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
} 