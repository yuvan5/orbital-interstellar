import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface ProposalCardProps {
    onYes: () => void;
}

const NO_PHRASES = [
    "No",
    "Are you sure?",
    "Refuse to accept that",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Absolutely not!",
    "This button is broken",
    "Ha! You missed",
];

export function ProposalCard({ onYes }: ProposalCardProps) {
    const [noCount, setNoCount] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [memeIndex, setMemeIndex] = useState(0);

    const handleNoHover = () => {
        // Button dimensions (approx)
        const buttonWidth = 150;
        const buttonHeight = 60;
        const padding = 20; // Keep away from edges

        // Get safe area dimensions
        const params = {
            width: window.innerWidth - buttonWidth - (padding * 2),
            height: window.innerHeight - buttonHeight - (padding * 2),
        };

        // Generate new coordinates relative to the VIEWPORT (fixed positioning)
        // Ensure coordinates are positive and within the safe area
        const newX = Math.max(padding, Math.random() * params.width + padding);
        const newY = Math.max(padding, Math.random() * params.height + padding);

        setPosition({ x: newX, y: newY });
        setNoCount(noCount + 1);

        // Shuffle meme: Pick a random index, try to avoid the same one twice if possible
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * ANGRY_MEMES.length);
        } while (newIndex === memeIndex && ANGRY_MEMES.length > 1);
        setMemeIndex(newIndex);
    };

    const getNoText = () => {
        return NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-white/40 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-md md:max-w-2xl lg:max-w-4xl w-full mx-auto relative overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(236,72,153,0.2)]">

            {/* Decorative background glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

            <h1
                className="text-5xl md:text-7xl font-bold text-pink-600 mb-8 md:mb-14 text-center leading-tight relative z-10"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
                Dear Tashaa, Will you be my <br />
                <span className="italic text-pink-500">Valentine?</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center w-full relative h-40 md:h-48 z-20">
                <button
                    onClick={onYes}
                    className="relative px-8 py-4 md:px-12 md:py-6 bg-gradient-to-tr from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xl md:text-3xl font-bold rounded-full shadow-lg shadow-pink-500/30 transform transition-all duration-300 hover:scale-110 active:scale-95 mx-4 border-b-4 border-pink-700 hover:border-pink-800 active:border-b-0 active:translate-y-1"
                >
                    <span className="drop-shadow-sm">Yes! 💖</span>
                </button>

                {/* The No button is rendered OUTSIDE the potentially relative flow for absolute freedom, OR controlled via fixed positioning if we want it to fly anywhere on screen. 
                    However, keeping it in flow initially is better for UX. Let's use 'fixed' for the motion to escape container bounds. 
                */}
                <motion.button
                    animate={position.x === 0 && position.y === 0 ? {} : {
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        x: position.x,
                        y: position.y
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    onHoverStart={handleNoHover}
                    onTouchStart={handleNoHover}
                    onClick={handleNoHover}
                    className={cn(
                        "px-8 py-4 md:px-12 md:py-6 bg-white/10 backdrop-blur-md text-red-500 hover:text-red-600 border border-red-200/50 text-xl md:text-2xl font-semibold rounded-full shadow-lg shadow-red-500/10 touch-manipulation hover:bg-red-50/50 transition-colors"
                    )}
                >
                    {getNoText()}
                </motion.button>
            </div>

            <div className="mt-8 md:mt-12 text-pink-400/80 font-medium text-sm md:text-lg animate-pulse z-10">
                {noCount > 0 && `Persistence Level: ${noCount}`}
            </div>

            {/* Angry Memes Section */}
            {noCount > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={memeIndex} // Re-animate on change
                    className="mt-8 w-full flex justify-center z-10"
                >
                    <img
                        src={ANGRY_MEMES[memeIndex]}
                        alt="Why are you doing this"
                        className="rounded-xl shadow-lg border-4 border-red-200 w-64 md:w-80 object-cover transform rotate-2 hover:rotate-0 transition-transform duration-300"
                    />
                </motion.div>
            )}
        </div>
    );
}

const ANGRY_MEMES = [
    "https://media1.tenor.com/m/_4uEGfEEfoUAAAAC/cat-computer.gif", // works
    "https://media1.tenor.com/m/02Hyp5H8rREAAAAC/kid-en-sacrement.gif", // works
    "https://media1.tenor.com/m/335Z5sgEHrEAAAAd/xiaopang-angry-xiaopang.gif", // The Office stare
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazl5azl5azl5azl5azl5azl5azl5azl5azl5azl5azl5azl5/11tTNkNy1SdXGg/giphy.gif", // works
    "https://media1.tenor.com/m/znHStxnHct8AAAAC/bad-words-vadivelu.gif", // Judge Judy
    "https://media1.tenor.com/m/gE9C-dgspBgAAAAd/h2di-dog-sus.gif", // Crying
];
