

"use client";

import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <section>
      <div className="min-h-screen bg-[#FFF6F1] flex items-center justify-center px-6 text-[17px] font-sans">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-white rounded-3xl max-w-5xl w-full px-14 py-16 border border-dashed border-pink-200"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.p variants={item} className="text-xs tracking-widest text-pink-400 mb-4">
                SMART • SIMPLE • AI-POWERED
              </motion.p>
              <motion.h1 variants={item} className={`text-4xl md:text-5xl text-gray-800 mb-4 leading-tight ${cursive.className}`}>
                AI Health Helpdesk
              </motion.h1>
              <motion.p variants={item} className="italic text-pink-400 mb-6">
                just for patients
              </motion.p>
              <motion.p variants={item} className="text-gray-600 max-w-md mb-8 leading-relaxed">
                A smart AI-based healthcare helpdesk that instantly answers
                patient queries related to appointments, symptoms, departments,
                and hospital facilities.
              </motion.p>
              <motion.button
                variants={item}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#F6B1C3] text-white px-8 py-3 rounded-full text-sm"
              >
                Ask the Helpdesk
              </motion.button>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <Image src="/hero.jpg" alt="AI Healthcare Helpdesk Illustration" width={360} height={360} className="object-contain" />
            </motion.div>
          </div>

          <span className="absolute -top-5 -left-5 w-8 h-8 bg-pink-200 rounded-full"></span>
          <span className="absolute top-8 -right-6 w-4 h-4 bg-pink-300 rounded-full"></span>
          <span className="absolute -bottom-6 left-10 w-5 h-5 bg-pink-100 rounded-full"></span>
        </motion.div>
      </div>
    </section>
  );
}