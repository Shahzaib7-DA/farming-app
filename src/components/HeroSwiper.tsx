import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    bg: "url('/public/slide1.jpg')",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-700",
    heading: "Welcome to KrishiSakhi",
    text: "Your smart farming companion. Get personalized advice, track activities, and boost your yield!",
    cta1: "Get Started",
    cta2: "Learn More",
    cta1Link: "/login",
    cta2Link: "/query",
  },
  {
    bg: "url('/public/slide2.jpg')",
    gradient: "bg-gradient-to-br from-sky-500 to-indigo-600",
    heading: "Ask Farm Queries Instantly",
  text: "Have a question about your crops, pests, or the market? Just ask the Farmer Assistant—your smart AI helper is always ready to listen and guide you instantly! Tap below to start a conversation.",
    cta1: "Ask Now",
    cta2: "Learn More",
    cta1Link: "/query",
    cta2Link: "/activities",
  },
  {
    bg: "url('/public/slide3.jpg')",
    gradient: "bg-gradient-to-br from-amber-400 to-orange-600",
    heading: "Track & Log Activities",
    text: "Easily record sowing, irrigation, and harvests. Stay organized and maximize your farm's potential.",
    cta1: "Log Activity",
    cta2: "Learn More",
    cta1Link: "/activities",
    cta2Link: "/profile",
  },
  {
    bg: "url('/public/slide4.jpg')",
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    heading: "Market Prices in One Click",
    text: "Instantly view the latest prices for top crops across markets. Swipe to explore, compare, and stay updated—empowering your farm business with real-time market insights!",
    cta1: "See Prices",
    cta2: "Learn More",
    cta1Link: "/#market-prices",
    cta2Link: "/query",
  },
];

export default function HeroSwiper() {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="h-[420px] md:h-[500px]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                backgroundImage: `${slide.bg}`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: 320,
              }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 ${slide.gradient} opacity-80`} />
              {/* Content */}
              <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-4 py-12 flex flex-col items-center justify-center">
                <motion.h2
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4"
                >
                  {slide.heading}
                </motion.h2>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-lg md:text-2xl text-white/90 mb-8 drop-shadow"
                >
                  {slide.text}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <a
                    href={slide.cta1Link}
                    className="px-7 py-3 rounded-full bg-white/90 text-emerald-700 font-semibold shadow hover:bg-white/100 transition text-lg"
                  >
                    {slide.cta1}
                  </a>
                  <a
                    href={slide.cta2Link}
                    className="px-7 py-3 rounded-full bg-emerald-700/90 text-white font-semibold shadow hover:bg-emerald-800 transition text-lg"
                  >
                    {slide.cta2}
                  </a>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
