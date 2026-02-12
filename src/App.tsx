import { useState } from "react";
import confetti from "canvas-confetti";
import { ProposalCard } from "./components/ProposalCard";
import { CelebrationGallery } from "./components/CelebrationGallery";

function App() {
  const [yesClicked, setYesClicked] = useState(false);

  // Audio ref
  const audioRef = useState(new Audio("/music.mp3"))[0];
  // NOTE: Replace the string above with "/music.mp3" and put your song in the public folder for custom music!

  const handleYes = () => {
    setYesClicked(true);

    // Play music
    audioRef.volume = 0.4; // 40% volume is polite
    audioRef.loop = true;
    audioRef.play().catch(e => console.log("Audio play failed (browser policy):", e));

    // Trigger confetti
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#ffe4e6] via-[#fbcfe8] to-[#e9d5ff] flex flex-col items-center justify-center relative selection:bg-pink-300 selection:text-white overflow-y-auto overflow-x-hidden">
      {/* Noise overlay for texture */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="z-10 w-full h-full flex flex-col items-center justify-center relative">
        {!yesClicked ? (
          <ProposalCard onYes={handleYes} />
        ) : (
          <CelebrationGallery />
        )}
      </div>
    </div>
  );
}

export default App;
