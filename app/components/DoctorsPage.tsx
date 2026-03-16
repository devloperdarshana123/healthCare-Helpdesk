
"use client";

import { useState } from "react";
import Image from "next/image";
const doctors = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "Cardiologist", experience: "12 years", rating: 4.8, reviews: 234, available: true, hospital: "AIIMS Delhi", fee: "₹800", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" },
  { id: 2, name: "Dr. Rahul Mehta", specialty: "Neurologist", experience: "15 years", rating: 4.9, reviews: 189, available: false, hospital: "Max Hospital", fee: "₹1000", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face" },
  { id: 3, name: "Dr. Anjali Singh", specialty: "Pediatrician", experience: "8 years", rating: 4.7, reviews: 312, available: true, hospital: "Fortis Hospital", fee: "₹600", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face" },
  { id: 4, name: "Dr. Vikram Patel", specialty: "Orthopedic", experience: "20 years", rating: 4.9, reviews: 445, available: true, hospital: "Apollo Hospital", fee: "₹1200", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face" },
  { id: 5, name: "Dr. Sneha Gupta", specialty: "Dermatologist", experience: "10 years", rating: 4.6, reviews: 278, available: false, hospital: "Medanta", fee: "₹700", img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&h=200&fit=crop&crop=face" },
  { id: 6, name: "Dr. Arjun Nair", specialty: "General Physician", experience: "6 years", rating: 4.5, reviews: 156, available: true, hospital: "City Hospital", fee: "₹400", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face" },
];

const specialties = ["All", "Cardiologist", "Neurologist", "Pediatrician", "Orthopedic", "Dermatologist", "General Physician"];

type Doctor = typeof doctors[0];

export default function DoctorsPage() {
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", reason: "" });

  const filtered = doctors.filter(d =>
    (selected === "All" || d.specialty === selected) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setBooked(false);
    setForm({ name: "", phone: "", date: "", reason: "" });
  };

  return (

    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find a Doctor</h1>
          <p className="text-gray-500 text-sm">Book appointments with top specialists</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search doctor by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {specialties.map(s => (
            <button key={s} onClick={() => setSelected(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${selected === s ? "bg-pink-500 text-white border-pink-500" : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(doc => (
            <div key={doc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <Image src={doc.img} alt={doc.name} width={64} height={64} className="rounded-full object-cover border-2 border-pink-100" />
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${doc.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                  {doc.available ? "● Available" : "● Unavailable"}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 text-base">{doc.name}</h3>
              <p className="text-pink-500 text-xs font-medium mt-0.5">{doc.specialty}</p>
              <p className="text-gray-400 text-xs mt-1">{doc.hospital} • {doc.experience}</p>
              <div className="flex items-center gap-1 mt-3">
                <span className="text-yellow-400 text-sm">⭐</span>
                <span className="text-sm font-semibold text-gray-700">{doc.rating}</span>
                <span className="text-xs text-gray-400">({doc.reviews} reviews)</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm font-semibold text-gray-700">{doc.fee} / visit</span>
                <button
                  disabled={!doc.available}
                  onClick={() => setSelectedDoctor(doc)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${doc.available ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                  {doc.available ? "Book Now" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">No doctors found 😕</div>
        )}
      </div>

      {/* MODAL */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

            {/* Close Button */}
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">✕</button>

            {!booked ? (
              <>
                {/* Doctor Info */}
                <div className="flex items-center gap-3 mb-6">
                  <Image src={selectedDoctor.img} alt={selectedDoctor.name} width={56} height={56} className="rounded-full object-cover border-2 border-pink-100" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedDoctor.name}</h3>
                    <p className="text-pink-500 text-xs">{selectedDoctor.specialty} • {selectedDoctor.hospital}</p>
                    <p className="text-gray-400 text-xs">{selectedDoctor.fee} / visit</p>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-800 mb-4">Book Appointment</h2>

                <form onSubmit={handleBook} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Your Name *</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400"
                      placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Phone Number *</label>
                    <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400"
                      placeholder="Enter phone number" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Preferred Date *</label>
                    <input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Reason for visit (optional)</label>
                    <textarea value={form.reason} onChange={e => setForm({...form, reason: e.target.value})}
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400 resize-none"
                      placeholder="Describe your symptoms..." />
                  </div>
                  <button type="submit" className="w-full bg-pink-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-pink-600 transition">
                    Confirm Appointment →
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Appointment Booked!</h3>
                <p className="text-gray-500 text-sm mb-1">with <span className="text-pink-500 font-medium">{selectedDoctor.name}</span></p>
                <p className="text-gray-500 text-sm mb-6">on <span className="font-medium">{form.date}</span></p>
                <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-600 mb-6 space-y-1">
                  <p>👤 {form.name}</p>
                  <p>📞 {form.phone}</p>
                  <p>🏥 {selectedDoctor.hospital}</p>
                  <p>💰 {selectedDoctor.fee}</p>
                </div>
                <button onClick={closeModal} className="w-full bg-pink-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-pink-600 transition">
                  Done ✓
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    
  );
}