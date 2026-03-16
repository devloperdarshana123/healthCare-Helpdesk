import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "Location required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    // API key nahi hai toh mock data return karo
    return NextResponse.json({
      hospitals: [
        { name: "City General Hospital", vicinity: "Near you", rating: 4.2, open_now: true, place_id: "1", geometry: { location: { lat: parseFloat(lat) + 0.01, lng: parseFloat(lng) + 0.01 } } },
        { name: "Apollo Clinic", vicinity: "500m away", rating: 4.5, open_now: true, place_id: "2", geometry: { location: { lat: parseFloat(lat) - 0.01, lng: parseFloat(lng) + 0.02 } } },
        { name: "Fortis Healthcare", vicinity: "1.2km away", rating: 4.0, open_now: false, place_id: "3", geometry: { location: { lat: parseFloat(lat) + 0.02, lng: parseFloat(lng) - 0.01 } } },
        { name: "Max Hospital", vicinity: "2km away", rating: 4.3, open_now: true, place_id: "4", geometry: { location: { lat: parseFloat(lat) - 0.02, lng: parseFloat(lng) - 0.02 } } },
      ]
    });
  }

  // Real Google Places API call
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    const hospitals = data.results?.map((p: any) => ({
      name: p.name,
      vicinity: p.vicinity,
      rating: p.rating,
      open_now: p.opening_hours?.open_now,
      place_id: p.place_id,
      geometry: p.geometry,
    })) ?? [];

    return NextResponse.json({ hospitals });
  } catch {
    return NextResponse.json({ error: "Failed to fetch hospitals" }, { status: 500 });
  }
}