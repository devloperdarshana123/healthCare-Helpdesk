// "use client";

// import Link from "next/link";
// import { Dancing_Script } from "next/font/google";
// const cursive = Dancing_Script({
//   subsets: ["latin"],
//   weight: ["600", "700"],
// });
// export default function Footer() {
//   return (
//     <footer  className="bg-[#FFF6F1] py-24 px-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-16 py-14">

//         {/* TOP CONTENT */}
//         <div className="grid md:grid-cols-4 gap-12">

//           {/* LEFT BRAND */}
//           <div>
//             <h3 className={`text-2xl md:text-3xl text-gray-800 mb-4 leading-tight ${cursive.className}`}>
//               AI Helpdesk
//             </h3>

//             <p className="text-sm text-gray-600 leading-relaxed">
//               An AI-powered college helpdesk system designed to assist
//               students with instant answers related to admissions,
//               exams, courses, and campus facilities.
//             </p>

//             {/* Decorative flowers / illustration placeholder */}
//             <div className="mt-6 text-pink-400 text-sm">
//               🌸 Designed with care for students
//             </div>
//           </div>

//           {/* COLUMN 1 */}
//          <div>
//   <h4 className="text-sm font-semibold text-gray-800 mb-4">
//     Project
//   </h4>

//   <ul className="space-y-2 text-sm text-gray-600">
//     <li>
//       <Link href="/#home" className="hover:text-pink-400 transition">
//         Home
//       </Link>
//     </li>

//     <li>
//       <Link href="/#about" className="hover:text-pink-400 transition">
//         About
//       </Link>
//     </li>

//     <li>
//       <Link href="/#features" className="hover:text-pink-400 transition">
//         Features
//       </Link>
//     </li>
//   </ul>
// </div>


//           {/* COLUMN 2 */}
//           <div>
//             <h4 className="text-sm font-semibold text-gray-800 mb-4">
//               Helpdesk
//             </h4>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li>Admissions Help</li>
//               <li>Exam Information</li>
//               <li>Course Guidance</li>
//             </ul>
//           </div>

//           {/* COLUMN 3 */}
//           <div>
//             <h4 className="text-sm font-semibold text-gray-800 mb-4">
//               Contact
//             </h4>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li>collegehelpdesk@edu.in</li>
//               <li>Student Support</li>
//               <li>24×7 Assistance</li>
//             </ul>
//           </div>

//         </div>

//         {/* DIVIDER */}
//         <div className="h-px bg-gray-100 my-10"></div>

//         {/* BOTTOM BAR */}
//         <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
//           <p>
//             © {new Date().getFullYear()} AI College Helpdesk.  
//             Academic Project.
//           </p>

//           <div className="flex gap-4 text-gray-400">
//             <span className="cursor-pointer hover:text-pink-400">●</span>
//             <span className="cursor-pointer hover:text-pink-400">●</span>
//             <span className="cursor-pointer hover:text-pink-400">●</span>
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }



"use client";

import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Footer() {
  return (
    <footer className="bg-[#FFF6F1] py-24 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-16 py-14">

        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className={`text-2xl md:text-3xl text-gray-800 mb-4 leading-tight ${cursive.className}`}>
              AI Health Helpdesk
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              An AI-powered healthcare helpdesk system designed to assist
              patients and staff with instant answers related to appointments,
              symptoms, departments, and hospital facilities.
            </p>
            <div className="mt-6 text-pink-400 text-sm">
              🌸 Designed with care for patients
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Project</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/#home" className="hover:text-pink-400 transition">Home</Link></li>
              <li><Link href="/#about" className="hover:text-pink-400 transition">About</Link></li>
              <li><Link href="/#features" className="hover:text-pink-400 transition">Features</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Helpdesk</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Appointment Booking</li>
              <li>Symptom Checker</li>
              <li>Department Guidance</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>healthhelpdesk@hospital.in</li>
              <li>Patient Support</li>
              <li>24×7 Assistance</li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-gray-100 my-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} AI Health Helpdesk. Academic Project.</p>
          <div className="flex gap-4 text-gray-400">
            <span className="cursor-pointer hover:text-pink-400">●</span>
            <span className="cursor-pointer hover:text-pink-400">●</span>
            <span className="cursor-pointer hover:text-pink-400">●</span>
          </div>
        </div>
      </div>
    </footer>
  );
}