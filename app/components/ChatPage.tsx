

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "bot";
  text: string;
  feedback?: "up" | "down" | null;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

const WELCOME = (lang: "en" | "hi"): Message => ({
  role: "bot",
  text: lang === "en"
    ? "Hi 👋 I'm your AI Health Helpdesk. Ask me anything about appointments, symptoms, departments, or hospital facilities."
    : "नमस्ते 👋 मैं आपका AI Health Helpdesk हूँ। अपॉइंटमेंट, लक्षण, विभाग या अस्पताल से जुड़े कोई भी सवाल पूछें।",
});

function TypingDots() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-sm">🤖</div>
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce [animation-delay:0ms]"></span>
        <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce [animation-delay:150ms]"></span>
        <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce [animation-delay:300ms]"></span>
      </div>
    </div>
  );
}

// ── Appointment Form ──────────────────────────────────────
function AppointmentForm({ onClose, lang }: { onClose: () => void; lang: "en" | "hi" }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", dept: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);

  const depts = ["General Medicine", "Cardiology", "Orthopedics", "Gynecology", "Pediatrics", "ENT", "Dermatology"];

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.date || !form.dept) return alert("Please fill all required fields.");
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md"
      >
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {lang === "en" ? "Appointment Booked!" : "अपॉइंटमेंट बुक हो गई!"}
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {lang === "en" ? `We'll confirm your appointment for ${form.date}.` : `${form.date} को आपकी अपॉइंटमेंट कन्फर्म की जाएगी।`}
            </p>
            <button onClick={onClose} className="bg-pink-400 text-white px-6 py-2 rounded-full text-sm">Close</button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {lang === "en" ? "Book Appointment" : "अपॉइंटमेंट बुक करें"}
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3">
              <input placeholder={lang === "en" ? "Full Name *" : "पूरा नाम *"} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200" />
              <input placeholder={lang === "en" ? "Phone Number *" : "फोन नंबर *"} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200" />
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200" />
              <select value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200">
                <option value="">{lang === "en" ? "Select Department *" : "विभाग चुनें *"}</option>
                {depts.map(d => <option key={d}>{d}</option>)}
              </select>
              <textarea placeholder={lang === "en" ? "Reason for visit (optional)" : "आने का कारण (वैकल्पिक)"} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none" />
            </div>
            <button onClick={handleSubmit} className="w-full mt-5 bg-pink-400 text-white py-3 rounded-xl text-sm font-medium hover:bg-pink-500 transition">
              {lang === "en" ? "Confirm Appointment" : "अपॉइंटमेंट कन्फर्म करें"}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
export default function ChatPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([WELCOME("en")]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Language toggle ──
  const toggleLang = () => {
    const next = lang === "en" ? "hi" : "en";
    setLang(next);
    setMessages([WELCOME(next)]);
    setConversations([]);
    setActiveId(null);
  };

  // ── Voice input ──
  const startVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice not supported in this browser. Use Chrome.");
    const rec = new SpeechRecognition();
    rec.lang = lang === "hi" ? "hi-IN" : "en-IN";
    rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e: any) => setInput(e.results[0][0].transcript);
    rec.start();
    recognitionRef.current = rec;
  };

  // ── New chat ──
  // const newChat = () => {
  //   if (messages.some(m => m.role === "user")) {
  //     const title = messages.find(m => m.role === "user")?.text.slice(0, 38) ?? "Chat";
  //     setConversations(prev => [{ id: Date.now().toString(), title, messages }, ...prev]);
  //   }
  //   setActiveId(null);
  //   setMessages([WELCOME(lang)]);
  //   setInput("");
  // };


  const newChat = async () => {
  if (messages.some(m => m.role === "user")) {
    const firstUserMsg = messages.find(m => m.role === "user")?.text ?? "Chat";

    // AI se smart title lo
    let title = firstUserMsg.slice(0, 40);
    try {
      const res = await fetch(`/api/chat?msg=${encodeURIComponent(firstUserMsg)}`);
      const data = await res.json();
      title = data.title ?? title;
    } catch {
      // fallback to user message
    }

    setConversations(prev => [{
      id: Date.now().toString(),
      title,
      messages,
      createdAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    }, ...prev]);
  }
  setActiveId(null);
  setMessages([WELCOME(lang)]);
  setInput("");
};

  const loadConversation = (c: Conversation) => {
    setActiveId(c.id);
    setMessages(c.messages);
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeId === id) { setActiveId(null); setMessages([WELCOME(lang)]); }
  };

  // ── Send message ──
  const sendMessage = async (text?: string) => {
    const msg = text ?? input;
    if (!msg.trim() || loading) return;
    const userMsg: Message = { role: "user", text: msg };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, lang }),
      });
      const data = await res.json();
      const botMsg: Message = { role: "bot", text: data.reply ?? "Sorry, kuch problem hui.", feedback: null };
      const final = [...updated, botMsg];
      setMessages(final);
      if (activeId) setConversations(prev => prev.map(c => c.id === activeId ? { ...c, messages: final } : c));
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Server error. Please try again.", feedback: null }]);
    } finally {
      setLoading(false);
    }
  };

  // ── Feedback ──
  const setFeedback = (i: number, val: "up" | "down") => {
    setMessages(prev => prev.map((m, idx) => idx === i ? { ...m, feedback: val } : m));
  };

  // ── Download PDF ──
  const downloadPDF = () => {
    const text = messages.map(m => `${m.role === "user" ? "You" : "AI"}: ${m.text}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chat-history.txt";
    a.click();
  };

  const quickQuestions = lang === "en"
    ? ["How to book appointment?", "OPD timings?", "Emergency contact?", "Which doctor for fever?"]
    : ["अपॉइंटमेंट कैसे बुक करें?", "OPD का समय?", "इमरजेंसी नंबर?", "बुखार के लिए कौन सा डॉक्टर?"];

  return (
    <div className="flex h-[calc(100vh-73px)] bg-[#FFF6F1]">

      {/* APPOINTMENT FORM MODAL */}
      <AnimatePresence>
        {showForm && <AppointmentForm onClose={() => setShowForm(false)} lang={lang} />}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.div animate={{ width: sidebarOpen ? 260 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden bg-white border-r border-pink-100 flex flex-col shrink-0">
        <div className="p-4 flex flex-col h-full min-w-65">
          <button onClick={newChat} className="w-full bg-pink-400 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-pink-500 transition mb-3">
            + {lang === "en" ? "New Chat" : "नई चैट"}
          </button>
          <button onClick={() => setShowForm(true)} className="w-full bg-white border border-pink-300 text-pink-500 rounded-xl py-2.5 text-sm font-medium hover:bg-pink-50 transition mb-4">
            📅 {lang === "en" ? "Book Appointment" : "अपॉइंटमेंट बुक करें"}
          </button>
          <p className="text-xs text-gray-400 mb-2 px-1">{lang === "en" ? "Chat History" : "चैट इतिहास"}</p>
          <div className="flex-1 overflow-y-auto space-y-1">
            {conversations.length === 0 && (
              <p className="text-xs text-gray-300 text-center mt-8">{lang === "en" ? "No history yet" : "अभी कोई इतिहास नहीं"}</p>
            )}
            {conversations.map(convo => (
              <div key={convo.id} onClick={() => loadConversation(convo)} className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm transition ${activeId === convo.id ? "bg-pink-50 text-pink-600" : "hover:bg-gray-50 text-gray-600"}`}>
                <div className="flex items-center gap-2 overflow-hidden">
                  <span>💬</span>
                  <span className="truncate">{convo.title}</span>
                </div>
                <button onClick={(e) => deleteConversation(convo.id, e)} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 text-xs ml-1">✕</button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="bg-white border-b border-pink-100 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-pink-400 transition text-lg">☰</button>
            <div>
              <h2 className="text-base font-semibold text-gray-800">AI Health Helpdesk</h2>
              <p className="text-xs text-gray-400">{lang === "en" ? "Ask your healthcare-related questions" : "स्वास्थ्य संबंधी प्रश्न पूछें"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button onClick={toggleLang} className="text-xs border border-pink-200 text-pink-500 px-3 py-1.5 rounded-full hover:bg-pink-50 transition">
              {lang === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
            </button>
            {/* Download */}
            <button onClick={downloadPDF} className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full hover:bg-gray-50 transition">
              ⬇ {lang === "en" ? "Download" : "डाउनलोड"}
            </button>
            <button onClick={newChat} className="text-xs text-gray-400 hover:text-pink-400 transition">
              {lang === "en" ? "New Chat +" : "नई चैट +"}
            </button>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-50 border-b border-red-100 px-6 py-2 text-xs text-red-500 flex items-center gap-2">
          🚨 {lang === "en" ? "Medical Emergency? Call" : "मेडिकल इमरजेंसी?"} <strong>112</strong> {lang === "en" ? "immediately" : "तुरंत कॉल करें"}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "bot" && <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-sm shrink-0">🤖</div>}
              <div className="flex flex-col gap-1 max-w-[70%]">
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-pink-400 text-white rounded-br-none" : "bg-white text-gray-700 rounded-bl-none shadow-sm border border-pink-50"}`}>
                  {msg.text}
                </div>
                {/* Feedback buttons for bot messages */}
                {msg.role === "bot" && i !== 0 && (
                  <div className="flex gap-2 px-1">
                    <button onClick={() => setFeedback(i, "up")} className={`text-xs transition ${msg.feedback === "up" ? "text-green-500" : "text-gray-300 hover:text-green-400"}`}>👍</button>
                    <button onClick={() => setFeedback(i, "down")} className={`text-xs transition ${msg.feedback === "down" ? "text-red-400" : "text-gray-300 hover:text-red-400"}`}>👎</button>
                  </div>
                )}
              </div>
              {msg.role === "user" && <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-sm text-white shrink-0">🧑‍⚕️</div>}
            </div>
          ))}
          {loading && <TypingDots />}
          <div ref={bottomRef} />
        </div>

        {/* Quick Questions */}
        <div className="px-6 pb-2 flex gap-2 overflow-x-auto">
          {quickQuestions.map((q, i) => (
            <button key={i} onClick={() => sendMessage(q)} className="shrink-0 text-xs border border-pink-200 text-pink-500 px-3 py-1.5 rounded-full hover:bg-pink-50 transition">
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-pink-100 px-6 py-4">
          <div className="flex gap-2 items-center">
            {/* Voice Button */}
            <button onClick={startVoice} className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition ${listening ? "bg-red-400 text-white animate-pulse" : "bg-pink-100 text-pink-400 hover:bg-pink-200"}`}>
              🎤
            </button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder={lang === "en" ? "Type your health-related question here…" : "यहाँ अपना स्वास्थ्य प्रश्न लिखें…"}
              className="flex-1 border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <button onClick={() => sendMessage()} disabled={loading} className="bg-pink-400 text-white px-6 py-2.5 rounded-full text-sm hover:bg-pink-500 transition disabled:opacity-50">
              {lang === "en" ? "Send" : "भेजें"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}