"use client";

import { useState, useEffect } from "react";
type Ambulance = {
  id: number;
  name: string;
  distance: string;
  eta: string;
  phone: string;
  status: "available" | "busy";
  type: string;
};

const mockAmbulances: Ambulance[] = [
  { id: 1, name: "City Emergency Services", distance: "0.8 km", eta: "3 min", phone: "108", status: "available", type: "Advanced Life Support" },
  { id: 2, name: "Apollo Ambulance", distance: "1.2 km", eta: "5 min", phone: "1066", status: "available", type: "Basic Life Support" },
  { id: 3, name: "Red Cross Unit", distance: "2.1 km", eta: "8 min", phone: "102", status: "busy", type: "Patient Transport" },
  { id: 4, name: "Medanta Emergency", distance: "2.8 km", eta: "10 min", phone: "011-4141-4141", status: "available", type: "Advanced Life Support" },
  { id: 5, name: "AIIMS Trauma Center", distance: "3.5 km", eta: "13 min", phone: "011-2658-8500", status: "available", type: "Trauma Unit" },
];

export default function AmbulanceTracker() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [called, setCalled] = useState<number | null>(null);
  const [error, setError] = useState("");

  const getLocation = () => {
    setLoading(true);
    setError("");
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setAmbulances(mockAmbulances);
        setLoading(false);
      },
      () => {
        setError("Location access denied. Showing demo data.");
        setAmbulances(mockAmbulances);
        setLoading(false);
      }
    );
  };

  return (
    
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🚑</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Ambulance Tracker</h1>
          <p className="text-gray-500 text-sm">Find nearest ambulances based on your location</p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="text-red-600 font-semibold text-sm">🚨 Medical Emergency?</p>
            <p className="text-red-400 text-xs mt-0.5">Call national ambulance helpline immediately</p>
          </div>
          <a href="tel:108" className="bg-red-500 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition">
            Call 108
          </a>
        </div>

        {/* Location Button */}
        {ambulances.length === 0 && (
          <button
            onClick={getLocation}
            disabled={loading}
            className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-pink-600 transition mb-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="animate-spin">⏳</span> Finding ambulances...</>
            ) : (
              <>📍 Use My Location to Find Ambulances</>
            )}
          </button>
        )}

        {error && (
          <p className="text-center text-orange-500 text-xs mb-4">{error}</p>
        )}

        {location && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 mb-6 text-xs text-green-600 text-center">
            ✅ Location found: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </div>
        )}

        {/* Ambulance List */}
        {ambulances.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-4">
              🚑 <span className="font-semibold text-gray-700">{ambulances.filter(a => a.status === "available").length} ambulances</span> available near you
            </p>

            <div className="space-y-4">
              {ambulances.map(amb => (
                <div key={amb.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{amb.name}</h3>
                      <p className="text-xs text-pink-500 mt-0.5">{amb.type}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      amb.status === "available" 
                        ? "bg-green-100 text-green-600" 
                        : "bg-red-100 text-red-500"
                    }`}>
                      {amb.status === "available" ? "● Available" : "● Busy"}
                    </span>
                  </div>

                  <div className="flex gap-4 text-xs text-gray-500 mb-4">
                    <span>📍 {amb.distance}</span>
                    <span>⏱ ETA: {amb.eta}</span>
                    <span>📞 {amb.phone}</span>
                  </div>

                  <div className="flex gap-3">
                    
                     <a href={`tel:${amb.phone}`}
                      className={`flex-1 text-center py-2 rounded-xl text-xs font-semibold transition ${
                        amb.status === "available"
                          ? "bg-pink-500 text-white hover:bg-pink-600"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                      }`}
                    >
                     📞Call Now
                    </a>
                    <button
                      onClick={() => setCalled(amb.id)}
                      disabled={amb.status === "busy"}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition ${
                        amb.status === "available"
                          ? called === amb.id
                            ? "border-green-500 text-green-600 bg-green-50"
                            : "border-pink-300 text-pink-500 hover:bg-pink-50"
                          : "border-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {called === amb.id ? "✓ Dispatched!" : "🚑 Dispatch"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Search Again */}
            <button
              onClick={() => { setAmbulances([]); setLocation(null); setCalled(null); }}
              className="w-full mt-6 border border-pink-300 text-pink-500 py-2.5 rounded-xl text-sm font-medium hover:bg-pink-50 transition"
            >
              🔄 Search Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}