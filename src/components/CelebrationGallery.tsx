import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PLACEHOLDER_IMAGES = [
    "/pics/IMG_0922.jpg",
    "/pics/IMG_2026 Copy.JPG",
    "/pics/IMG_3703.jpg",
    "/pics/IMG_3816.JPG",
];

const MEMES = [
    { text: "Us when we get food", img: "/pics/IMG_7300.JPG" },
];

export function CelebrationGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 3500);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % PLACEHOLDER_IMAGES.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + PLACEHOLDER_IMAGES.length) % PLACEHOLDER_IMAGES.length);
    };

    const variants = {
        enter: {
            opacity: 0,
            scale: 0.95
        },
        center: {
            zIndex: 1,
            opacity: 1,
            scale: 1
        },
        exit: {
            zIndex: 0,
            opacity: 0,
            scale: 0.95
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full max-w-4xl lg:max-w-6xl mx-auto p-4 flex flex-col items-center"
        >
            <h2 className="text-3xl lg:text-6xl font-bold text-center text-white mb-8 lg:mb-12 drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Yay! Here is a glimpse of us! 📸
            </h2>

            {/* Slideshow Container */}
            <div className="relative w-full max-w-[320px] md:max-w-[380px] aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl mb-12 hover:shadow-pink-500/20 transition-shadow duration-500 group">
                {/* Inner Frame */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.img
                            key={currentIndex}
                            src={PLACEHOLDER_IMAGES[currentIndex]}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                opacity: { duration: 0.5, ease: "easeInOut" },
                                scale: { duration: 0.5, ease: "easeInOut" }
                            }}
                            className="absolute w-full h-full object-contain"
                            alt="Our future memory"
                        />
                    </AnimatePresence>

                    {/* Gradient Overlay for Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Controls - Visible on Group Hover */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all transform hover:scale-110 active:scale-95 z-20 opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all transform hover:scale-110 active:scale-95 z-20 opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        {PLACEHOLDER_IMAGES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                    ? "bg-white w-6"
                                    : "bg-white/50 hover:bg-white/80"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
                <h2>

                </h2>
            </div>

            {/* Thank You Message */}
            <div className="mt-16 mb-8 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Thank you for accepting! 💕
                </h3>
                <p className="text-lg md:text-xl text-white/90" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    See you on the 14th! 🌹
                </p>
            </div>

            <p className="text-xs md:text-sm text-white/60 text-center mt-12 mb-4 italic">
                Designed & Developed by Yours Truly, Yuvan 😎
            </p>
        </motion.div>
    );
}
