


"use client";

import Image from "next/image";
import { Dancing_Script } from "next/font/google";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function AboutPage() {
  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT – IMAGE COLLAGE */}
        <div className="relative">

          {/* TOP STAT CARD */}
          <div className="absolute -top-10 left-20 bg-white shadow-lg rounded-xl px-6 py-4 text-sm">
            <p className="font-semibold text-gray-800">24×7 Support</p>
            <p className="text-gray-500 text-xs mt-1">
              Always available for patients
            </p>
          </div>

          {/* IMAGE 1 */}
          <div className="rounded-3xl overflow-hidden shadow-md mb-8">
            <Image
              src="/a1.jpg"
              alt="Patient care illustration"
              width={420}
              height={420}
              className="object-cover"
            />
          </div>

          {/* IMAGE 2 */}
          <div className="rounded-3xl overflow-hidden shadow-md w-64 ml-auto">
            <Image
              src="/a2.jpg"
              alt="AI healthcare helpdesk illustration"
              width={320}
              height={320}
              className="object-cover"
            />
          </div>

          {/* RATING */}
          <div className="absolute bottom-6 left-10 bg-white rounded-xl px-4 py-2 shadow text-xs">
            ⭐⭐⭐⭐⭐ Trusted by patients & doctors
          </div>
        </div>

        {/* RIGHT – TEXT CONTENT */}
        <div>
          <p className={`text-sm tracking-widest text-purple-400 mb-3 ${cursive.className}`}>
            A BIT
          </p>

          <h2
            className={`text-4xl md:text-5xl text-gray-800 mb-4 leading-tight ${cursive.className}`}
          >
            ABOUT US
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
            AI Healthcare Helpdesk is an intelligent web-based system designed
            to assist patients and healthcare staff by providing instant
            responses to medical and hospital-related queries.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
            By integrating artificial intelligence, the system improves
            accessibility, reduces manual workload, and ensures accurate
            information delivery for appointments, symptoms, departments,
            and hospital facilities.
          </p>

          <button className="bg-purple-500 text-white px-8 py-3 rounded-full text-sm hover:opacity-90 transition">
            Explore More
          </button>
        </div>

      </div>
    </section>
  );
}