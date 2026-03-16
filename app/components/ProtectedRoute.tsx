// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../lib/firebase";

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [checking, setChecking] = useState(true);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (!currentUser) {
//         router.push("/login");
//       } else {
//         setUser(currentUser);
//       }
//       setChecking(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (checking) {
//     return (
//       <div className="min-h-screen bg-[#FFF6F1] flex items-center justify-center">
//         <p className="text-pink-400 text-lg animate-pulse">Loading...</p>
//       </div>
//     );
//   }

//   if (!user) return null;

//   return <>{children}</>;
// }


"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#FFF6F1] flex items-center justify-center">
        <p className="text-pink-400 text-lg animate-pulse">✨ Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}