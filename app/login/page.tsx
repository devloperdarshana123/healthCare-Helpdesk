"use client";
import { useState } from "react";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Dancing_Script, Nunito } from "next/font/google";
import { Mail, Lock, Phone, Hash, ArrowRight, Loader2 } from "lucide-react";

const cursive = Dancing_Script({ subsets: ["latin"], weight: ["600", "700"] });
const body = Nunito({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmResult, setConfirmResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    try {
      setError("");
      setLoading(true);
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
      const result = await signInWithPhoneNumber(auth, phone, recaptcha);
      setConfirmResult(result);
      setOtpSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      await confirmResult.confirm(otp);
      router.push("/");
    } catch {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex ${body.className}`} style={{ background: "#FFF6F1" }}>

      {/* LEFT SIDE */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden p-12"
        style={{ background: "linear-gradient(135deg, #ff6b9d 0%, #ff8c69 40%, #ffb347 100%)" }}
      >
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-20 bg-white" />
        <div className="absolute bottom-[-60px] right-[-60px] w-56 h-56 rounded-full opacity-20 bg-white" />
        <div className="absolute top-1/2 right-[-40px] w-32 h-32 rounded-full opacity-10 bg-white" />

        <div className="relative z-10">
          <span className={`text-white text-2xl font-bold ${cursive.className}`}>
            🏥 AI Health Helpdesk
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-start">
          <div className="text-8xl mb-6">🩺</div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Your Health,<br />Our Priority
          </h2>
          <p className="text-white/80 text-base leading-relaxed max-w-sm">
            Get instant access to doctors, symptom checker, ambulance tracking, and AI-powered health guidance — all in one place.
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {["🩺 AI Diagnosis", "🚑 Ambulance", "👨‍⚕️ Doctors", "💊 Symptoms"].map(f => (
              <span key={f} className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/60 text-xs">Trusted by thousands of patients across India 🇮🇳</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <div className={`lg:hidden text-center mb-8 ${cursive.className}`}>
            <span className="text-2xl text-gray-800">🏥 AI Health Helpdesk</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            {isRegister ? "Create Account" : "Welcome Back! 👋"}
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            {isRegister ? "Join us to access all health services" : "Login to access your health dashboard"}
          </p>

          {/* Tab Switch */}
          <div className="flex rounded-2xl border border-pink-100 overflow-hidden mb-6 bg-pink-50/50">
            <button
              onClick={() => setTab("email")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                tab === "email"
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-xl shadow-sm"
                  : "text-gray-400 hover:text-pink-400"
              }`}
            >
              <Mail size={14} /> Email
            </button>
            <button
              onClick={() => setTab("phone")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                tab === "phone"
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-xl shadow-sm"
                  : "text-gray-400 hover:text-pink-400"
              }`}
            >
              <Phone size={14} /> Phone OTP
            </button>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-2xl py-3 text-sm font-semibold text-gray-700 hover:border-pink-300 hover:shadow-md transition-all mb-5 shadow-sm"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-pink-100" />
            <span className="text-xs text-gray-300 font-medium">OR</span>
            <div className="flex-1 h-px bg-pink-100" />
          </div>

          {/* Email Form */}
          {tab === "email" && (
            <form onSubmit={handleEmail} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-white"
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl text-white text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #ff6b9d, #ff8c69)" }}
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Please wait...</>
                ) : isRegister ? (
                  "Create Account 🎉"
                ) : (
                  <> Login <ArrowRight size={16} /></>
                )}
              </button>
              <p
                onClick={() => setIsRegister(!isRegister)}
                className="text-center text-xs text-pink-400 cursor-pointer hover:text-pink-600 transition font-medium"
              >
                {isRegister ? "Already have an account? Login" : "New user? Register here"}
              </p>
            </form>
          )}

          {/* Phone Form */}
          {tab === "phone" && (
            <div className="space-y-4">
              {!otpSent ? (
                <>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-white"
                    />
                  </div>
                  <button
                    onClick={sendOtp}
                    disabled={loading}
                    className="w-full py-3 rounded-2xl text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #ff6b9d, #ff8c69)" }}
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><ArrowRight size={16} /> Send OTP</>}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs text-center text-gray-400">
                    OTP sent to <span className="text-pink-500 font-medium">{phone}</span>
                  </p>
                  <div className="relative">
                    <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-white"
                    />
                  </div>
                  <button
                    onClick={verifyOtp}
                    disabled={loading}
                    className="w-full py-3 rounded-2xl text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #ff6b9d, #ff8c69)" }}
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : <><ArrowRight size={16} /> Verify OTP</>}
                  </button>
                </>
              )}
              <div id="recaptcha-container" />
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              <p className="text-red-500 text-xs text-center">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}