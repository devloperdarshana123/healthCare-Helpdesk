"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dancing_Script } from "next/font/google";

const cursive = Dancing_Script({ subsets: ["latin"], weight: ["600"] });

interface Hospital {
  name: string;
  vicinity: string;
  rating?: number;
  open_now?: boolean;
  place_id: string;
  geometry: { location: { lat: number; lng: number } };
}

export default function HospitalFinder() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searched, setSearched] = useState(false);

  const findHospitals = () => {
    setLoading(true);
    setError("");
    setSearched(false);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        try {
          const res = await fetch(`/api/hospitals?lat=${latitude}&lng=${longitude}`);
          const data = await res.json();

          if (data.error) {
            setError(data.error);
          } else {
            setHospitals(data.hospitals ?? []);
            setSearched(true);
          }
        } catch {
          setError("Failed to fetch hospitals. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please allow location permission and try again.");
        setLoading(false);
      }
    );
  };

  const openMaps = (hospital: Hospital) => {
    const { lat, lng } = hospital.geometry.location;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
  };

  const openAllOnMap = () => {
    if (!userLocation) return;
    window.open(
      `https://www.google.com/maps/search/hospitals/@${userLocation.lat},${userLocation.lng},14z`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF6F1] px-6 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className={`text-sm tracking-widest text-pink-400 mb-2 ${cursive.className}`}>
            Location Based
          </p>
          <h1 className={`text-4xl text-gray-800 mb-3 ${cursive.className}`}>
            Hospital Finder
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Find nearby hospitals and clinics based on your current location.
          </p>
        </div>

        {/* Find Button */}
        {!searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm p-10 text-center"
          >
            <div className="text-6xl mb-6">🏥</div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Find hospitals near you</h2>
            <p className="text-gray-400 text-sm mb-8">
              We'll use your device location to find the nearest hospitals and clinics.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            <button
              onClick={findHospitals}
              disabled={loading}
              className="bg-pink-400 text-white px-10 py-3 rounded-full text-sm font-medium hover:bg-pink-500 transition disabled:opacity-50"
            >
              {loading ? "Finding hospitals..." : "📍 Use My Location"}
            </button>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                  {hospitals.length} hospitals found near you
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={openAllOnMap}
                    className="text-xs border border-pink-200 text-pink-500 px-4 py-1.5 rounded-full hover:bg-pink-50 transition"
                  >
                    🗺 View on Map
                  </button>
                  <button
                    onClick={() => { setSearched(false); setHospitals([]); }}
                    className="text-xs border border-gray-200 text-gray-500 px-4 py-1.5 rounded-full hover:bg-gray-50 transition"
                  >
                    Search Again
                  </button>
                </div>
              </div>

              {/* Hospital Cards */}
              <div className="space-y-3">
                {hospitals.map((h, i) => (
                  <motion.div
                    key={h.place_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white rounded-2xl shadow-sm px-6 py-5 flex items-center justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-lg shrink-0">
                        🏥
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">{h.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{h.vicinity}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          {h.rating && (
                            <span className="text-xs text-amber-500">⭐ {h.rating}</span>
                          )}
                          {h.open_now !== undefined && (
                            <span className={`text-xs ${h.open_now ? "text-green-500" : "text-red-400"}`}>
                              {h.open_now ? "● Open now" : "● Closed"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openMaps(h)}
                      className="shrink-0 bg-pink-400 text-white px-4 py-2 rounded-full text-xs hover:bg-pink-500 transition ml-4"
                    >
                      Directions →
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Emergency */}
              <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl px-6 py-4 text-center">
                <p className="text-red-500 text-sm font-medium">🚨 Medical Emergency?</p>
                <p className="text-red-400 text-xs mt-1">Call <strong>112</strong> immediately for ambulance</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}