


"use client";

import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const textVariant = (direction = "left") => ({
  hidden: { opacity: 0, x: direction === "left" ? -40 : 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const imageVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Features() {
  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-6xl mx-auto space-y-40">
        <h1 className={`text-4xl md:text-5xl text-gray-800 mb-4 leading-tight ${cursive.className}`}>
          Features
        </h1>

        {/* FEATURE 1 */}
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div variants={textVariant("left")} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className={`text-2xl text-indigo-500 mb-2 ${cursive.className}`}>Smart AI</p>
            <h2 className="text-4xl font-bold mb-6">thinking for patients</h2>
            <p className="text-gray-600 max-w-md leading-relaxed mb-8">
              Our AI-powered helpdesk understands patient questions and provides
              clear, accurate answers related to appointments, symptoms, departments,
              and hospital facilities — instantly and effortlessly.
            </p>
            <motion.button whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-black text-white px-6 py-3 text-sm">
              Explore Feature
            </motion.button>
          </motion.div>

          <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ rotateX: 4, rotateY: -4 }} transition={{ type: "spring", stiffness: 120 }} className="flex justify-center">
            <Image src="/f1.jpg" alt="AI Healthcare Thinking Illustration" width={420} height={420} />
          </motion.div>
        </div>

        {/* FEATURE 2 */}
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ rotateX: 4, rotateY: 4 }} transition={{ type: "spring", stiffness: 120 }} className="order-2 md:order-1 flex justify-center">
            <Image src="/f2.jpg" alt="24x7 Medical Support Illustration" width={420} height={420} />
          </motion.div>

          <motion.div variants={textVariant("right")} initial="hidden" whileInView="show" viewport={{ once: true }} className="order-1 md:order-2">
            <p className={`text-2xl text-indigo-500 mb-2 ${cursive.className}`}>24×7 Support</p>
            <h2 className="text-4xl font-bold mb-6">always available</h2>
            <p className="text-gray-600 max-w-md leading-relaxed mb-8">
              Patients and healthcare staff can access the helpdesk anytime
              without waiting for hospital hours. The system ensures uninterrupted
              support and reduces dependency on manual medical helpdesks.
            </p>
            <motion.button whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-black text-white px-6 py-3 text-sm">
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* FEATURE 3 */}
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div variants={textVariant("left")} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className={`text-2xl text-indigo-500 mb-2 ${cursive.className}`}>Simple Experience</p>
            <h2 className="text-4xl font-bold mb-6">designed with care</h2>
            <p className="text-gray-600 max-w-md leading-relaxed mb-8">
              The interface is intentionally minimal, friendly, and easy to use.
              Patients can focus on getting answers without distractions or
              complex navigation — especially during stressful medical situations.
            </p>
            <motion.button whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-black text-white px-6 py-3 text-sm">
              Try It Now
            </motion.button>
          </motion.div>

          <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ rotateX: 4, rotateY: -4 }} transition={{ type: "spring", stiffness: 120 }} className="flex justify-center">
            <Image src="/f3.jpg" alt="Simple Healthcare UI Illustration" width={420} height={420} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}