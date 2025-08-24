"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { APPNAME } from "@/constants";

// const launchDate = new Date(Date.UTC(2025, 7, 17, 8,40));
const launchDate = new Date(Date.UTC(2025, 7, 27, 14, 30));

export default function LaunchPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLaunched, setIsLaunched] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ Form state
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  // ✅ Hydration + check localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("medireon-subscribed");
    if (saved === "true") {
      setSubscribed(true);
    }
  }, []);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const distance = launchDate.getTime() - now;

    if (distance <= 0) {
      setIsLaunched(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted, calculateTimeLeft]);

  // ✅ Handle subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const encodedBody = `email=${encodeURIComponent(email)}&launch=${encodeURIComponent("true")}`;

    const res = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedBody,
    });

    await res.text();


    setSubscribed(true);
    localStorage.setItem("medireon-subscribed", "true");
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white px-6 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600">
        <div className="animate-pulse">
          <div className="h-16 bg-white/20 rounded mb-6 w-96"></div>
          <div className="h-8 bg-white/20 rounded mb-10 w-80"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-24 bg-white/20 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white px-6 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] opacity-30 blur-2xl"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="circleGradient1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="100" fill="url(#circleGradient1)" />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[-25%] right-[-15%] w-[70%] h-[70%] opacity-30 blur-2xl"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="circleGradient2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="100" fill="url(#circleGradient2)" />
          </svg>
        </motion.div>
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/medical-pattern.svg')] bg-[length:400px] opacity-10" />

      {/* Launched state */}
      {isLaunched ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6">
            <span className="text-cyan-300 drop-shadow-lg">{APPNAME}</span>
          </h1>
          <p className="text-3xl md:text-5xl text-green-400 font-bold mb-8">
            🎉 NOW LIVE! 🎉
          </p>
          <button
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(0,255,255,0.5)] "
            onClick={() => window.open("/", "_self")}
          >
            Enter Platform
          </button>
        </motion.div>
      ) : (
        <>
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-center mb-6 relative z-10"
          >
            <span className="text-cyan-300 drop-shadow-lg">{APPNAME}</span>
            <br />
            <span className="text-2xl md:text-4xl">🚀 Launching Soon 🚀</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-blue-100 text-center mb-10 max-w-2xl relative z-10 leading-relaxed"
          >
            A futuristic healthcare SaaS platform for seamless operations — from
            patient records to billing & scheduling.
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10 mb-8"
            role="timer"
            aria-label="Launch countdown timer"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((unit, idx) => (
              <motion.div
                key={`${unit.label}-${idx}`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(0,255,255,0.5)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl bg-black/40 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,255,255,0.3)] backdrop-blur-md min-w-[80px] md:min-w-[100px]"
              >
                <motion.p
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl md:text-5xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                >
                  {unit.value.toString().padStart(2, "0")}
                </motion.p>
                <p className="uppercase text-xs md:text-sm text-blue-200 mt-2 tracking-wide">
                  {unit.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-center relative z-10 mb-8"
          >
            {subscribed ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 font-semibold text-lg md:text-xl"
              >
                ✅ Thanks! We’ll keep you updated 🚀
              </motion.p>
            ) : (
              <>
                <p className="text-blue-200 mb-4">
                  Get notified when we launch!
                </p>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 items-center justify-center max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-lg bg-black/30 border border-cyan-400/30 text-white placeholder-blue-300/70 backdrop-blur-md focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] flex-1 min-w-0"
                    aria-label="Email address for launch notification"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(0,255,255,0.3)] whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
                {error && (
                  <p className="text-red-400 text-lg mt-2 font-semibold ">{error}</p>
                )}
              </>
            )}
          </motion.div>
        </>
      )}

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-8 text-blue-200/70 text-sm relative z-10"
      >
        © 2025 Medireon — Transforming Healthcare
      </motion.p>
    </section>
  );
}
