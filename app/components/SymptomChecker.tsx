"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dancing_Script } from "next/font/google";

const cursive = Dancing_Script({ subsets: ["latin"], weight: ["600"] });

const SYMPTOMS = [
  "Fever", "Headache", "Cough", "Sore throat", "Chest pain",
  "Shortness of breath", "Nausea", "Vomiting", "Diarrhea",
  "Stomach pain", "Back pain", "Joint pain", "Fatigue",
  "Dizziness", "Rash", "Swelling",
];

interface Result {
  condition: string;
  specialist: string;
  urgency: "low" | "medium" | "high";
  advice: string;
}

export default function SymptomChecker() {
  const [selected, setSelected] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [customSymptom, setCustomSymptom] = useState("");

  const toggleSymptom = (s: string) => {
    setSelected(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const addCustom = () => {
    if (customSymptom.trim() && !selected.includes(customSymptom.trim())) {
      setSelected(prev => [...prev, customSymptom.trim()]);
      setCustomSymptom("");
    }
  };

  const checkSymptoms = async () => {
    if (selected.length === 0) return alert("Please select at least one symptom.");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/symptom-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selected, duration, age }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelected([]);
    setDuration("");
    setAge("");
    setResult(null);
  };

  const urgencyColor = {
    low: "bg-green-50 border-green-200 text-green-700",
    medium: "bg-yellow-50 border-yellow-200 text-yellow-700",
    high: "bg-red-50 border-red-200 text-red-700",
  };

  const urgencyLabel = {
    low: "🟢 Low — Home care likely sufficient",
    medium: "🟡 Medium — Consult a doctor soon",
    high: "🔴 High — Visit a doctor immediately",
  };

  return (
    <div className="min-h-screen bg-[#FFF6F1] px-6 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className={`text-sm tracking-widest text-pink-400 mb-2 ${cursive.className}`}>
            AI-Powered
          </p>
          <h1 className={`text-4xl text-gray-800 mb-3 ${cursive.className}`}>
            Symptom Checker
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Select your symptoms and our AI will suggest possible conditions
            and the right specialist to consult.
          </p>
          <div className="mt-3 inline-block bg-red-50 border border-red-200 text-red-500 text-xs px-4 py-1.5 rounded-full">
            ⚠️ Not a diagnosis tool — always consult a doctor
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-sm p-8 space-y-8"
            >
              {/* Age + Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Your Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Duration</label>
                  <select
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                  >
                    <option value="">Select duration</option>
                    <option>Less than 1 day</option>
                    <option>1–3 days</option>
                    <option>4–7 days</option>
                    <option>More than 1 week</option>
                    <option>More than 1 month</option>
                  </select>
                </div>
              </div>

              {/* Symptom Tags */}
              <div>
                <label className="text-xs text-gray-500 mb-3 block">Select symptoms (tap to select)</label>
                <div className="flex flex-wrap gap-2">
                  {SYMPTOMS.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleSymptom(s)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition ${
                        selected.includes(s)
                          ? "bg-pink-400 text-white border-pink-400"
                          : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom symptom */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Add custom symptom</label>
                <div className="flex gap-2">
                  <input
                    value={customSymptom}
                    onChange={e => setCustomSymptom(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addCustom()}
                    placeholder="Type a symptom..."
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                  <button onClick={addCustom} className="bg-pink-100 text-pink-500 px-4 py-2 rounded-xl text-sm hover:bg-pink-200 transition">
                    Add
                  </button>
                </div>
              </div>

              {/* Selected pills */}
              {selected.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Selected ({selected.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.map(s => (
                      <span key={s} className="flex items-center gap-1 bg-pink-50 text-pink-600 border border-pink-200 px-3 py-1 rounded-full text-xs">
                        {s}
                        <button onClick={() => toggleSymptom(s)} className="hover:text-red-400 ml-1">✕</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={checkSymptoms}
                disabled={loading || selected.length === 0}
                className="w-full bg-pink-400 text-white py-3 rounded-xl text-sm font-medium hover:bg-pink-500 transition disabled:opacity-50"
              >
                {loading ? "Analyzing symptoms..." : "Check Symptoms →"}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl shadow-sm p-8 space-y-6"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">🩺</div>
                <h2 className={`text-2xl text-gray-800 ${cursive.className}`}>Analysis Complete</h2>
              </div>

              {/* Urgency */}
              <div className={`border rounded-2xl px-5 py-4 text-sm font-medium ${urgencyColor[result.urgency]}`}>
                {urgencyLabel[result.urgency]}
              </div>

              {/* Condition */}
              <div className="bg-gray-50 rounded-2xl px-5 py-4">
                <p className="text-xs text-gray-400 mb-1">Possible condition</p>
                <p className="text-gray-800 font-medium">{result.condition}</p>
              </div>

              {/* Specialist */}
              <div className="bg-pink-50 rounded-2xl px-5 py-4">
                <p className="text-xs text-pink-400 mb-1">Recommended specialist</p>
                <p className="text-pink-700 font-medium">👨‍⚕️ {result.specialist}</p>
              </div>

              {/* Advice */}
              <div className="bg-blue-50 rounded-2xl px-5 py-4">
                <p className="text-xs text-blue-400 mb-1">AI advice</p>
                <p className="text-blue-700 text-sm leading-relaxed">{result.advice}</p>
              </div>

              <div className="text-xs text-gray-400 text-center">
                This is AI-generated information only. Please consult a qualified doctor for proper diagnosis.
              </div>

              <div className="flex gap-3">
                <button onClick={reset} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm hover:bg-gray-50 transition">
                  ← Check Again
                </button>
                <a href="/chat" className="flex-1 bg-pink-400 text-white py-3 rounded-xl text-sm text-center hover:bg-pink-500 transition">
                  Chat with AI →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}