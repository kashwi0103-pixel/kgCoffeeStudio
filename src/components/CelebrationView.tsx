/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  RotateCcw,
  Coffee,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { CoffeeState } from '../types/coffee';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';
import { soundEngine } from '../utils/audio';

interface CelebrationViewProps {
  coffeeState: CoffeeState;
  onBrewAgain: () => void;
}

export const CelebrationView: React.FC<CelebrationViewProps> = ({
  coffeeState,
  onBrewAgain,
}) => {
  const [sipsTaken, setSipsTaken] = useState(0);
  const [isSipping, setIsSipping] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Launch pastel confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#F472B6', '#FBBF24', '#FBCFE8', '#DDD6FE', '#BAE6FD', '#FED7AA'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  const handleSip = () => {
    setIsSipping(true);
    soundEngine.playBubble();
    soundEngine.playSwirl();
    setSipsTaken((prev) => prev + 1);
    setTimeout(() => {
      setIsSipping(false);
    }, 600);
  };

  const handleShare = () => {
    soundEngine.playPop();
    const recipeText = `✨ I just brewed a delicious bubbly pastel iced whipped coffee! ☕\nWhipped Dalgona cream + Chilled milk + Cinnamon & Vanilla!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(recipeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 select-none text-center">
      {/* Decorative Pastel Background Atmosphere */}
      <div className="absolute top-1/4 left-8 w-32 h-32 rounded-full bg-pink-100/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-8 w-36 h-36 rounded-full bg-amber-100/50 blur-3xl pointer-events-none" />

      {/* Floating Sparkles Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold mb-4 border border-pink-200/80 shadow-sm animate-bounce">
        <Sparkles className="w-4 h-4 text-pink-500 fill-current" />
        <span>KG Coffee Studio · Handcrafted With Love</span>
      </div>

      {/* Primary User Prompt Text: "Your coffee is ready." with personalized name */}
      <h1 className="text-4xl sm:text-6xl font-bubbly font-bold text-[#5C3D2E] tracking-tight mb-3">
        {coffeeState.customerName
          ? `${coffeeState.customerName}, your coffee is ready! ☕✨`
          : 'Your coffee is ready! ☕✨'}
      </h1>

      <p className="text-base sm:text-lg text-[#856353] max-w-md mx-auto mb-8 font-medium">
        Starbucks style cup ready for {coffeeState.customerName || 'you'}! Ekdum bubbly, creamy aur aesthetic.
      </p>

      {/* Finished Coffee Showcase Card */}
      <div className="relative bg-gradient-to-b from-white via-[#FFF8F5] to-[#FDF0EC] rounded-3xl p-8 border-2 border-pink-200/80 bubbly-card-shadow max-w-lg mx-auto mb-8">
        {/* Floating Sip Hearts */}
        {isSipping && (
          <div className="absolute top-4 inset-x-0 flex justify-center gap-3 z-30 pointer-events-none">
            <Heart className="w-6 h-6 text-pink-500 fill-current animate-bounce" />
            <Heart className="w-8 h-8 text-rose-400 fill-current animate-bounce delay-75" />
            <Heart className="w-5 h-5 text-pink-300 fill-current animate-bounce delay-150" />
          </div>
        )}

        {/* Barista Name Tag Applied Banner */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-bold mb-2 border border-pink-200 animate-pulse">
          <span>🏷️ Barista attached your Starbucks-style name tag!</span>
        </div>

        {/* Cup Canvas with name tag sticker on */}
        <div className={`transition-transform duration-300 ${isSipping ? 'scale-105' : ''}`}>
          <CoffeeCupCanvas coffeeState={coffeeState} showNameTag={true} />
        </div>

        {/* Drink Title & Badges */}
        <div className="mt-4">
          <h3 className="font-bubbly text-2xl font-bold text-[#5C3D2E]">
            Fluffy Whipped Iced Latte
          </h3>
          <p className="text-xs text-[#8C6D60] font-medium mt-1">
            Made with instant coffee, whipped foam, chilled milk & spices
          </p>
        </div>

        {/* Interactive "Take a Sip" Button */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleSip}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bubbly text-base font-bold flex items-center gap-2 bubbly-shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Take a Sip 🥤</span>
            {sipsTaken > 0 && (
              <span className="text-xs bg-white/30 px-2 py-0.5 rounded-full font-sans">
                {sipsTaken} {sipsTaken === 1 ? 'sip' : 'sips'}!
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="px-4 py-3 rounded-2xl bg-white hover:bg-stone-50 text-[#6D4C41] border border-pink-200 font-bubbly text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-pink-500" />
            <span>{copied ? 'Recipe Copied! 💕' : 'Share Recipe'}</span>
          </button>
        </div>
      </div>

      {/* Recipe Summary Breakdown */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-pink-100 max-w-lg mx-auto mb-8 text-left shadow-sm">
        <h4 className="font-bubbly text-lg font-bold text-[#5C3D2E] mb-3 flex items-center gap-2">
          <Coffee className="w-4 h-4 text-amber-600" />
          <span>Recipe Recap</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-[#7C594C]">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Whisked Coffee + Sugar + Splash of warm water</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Frother aerated to 100% thick golden Dalgona cloud</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Shaken with crystalline ice cubes</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Poured chilled whole milk and swirled to marble</span>
          </li>
          {(coffeeState.cinnamonSprinkled || coffeeState.vanillaDrizzled) && (
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                Topped with{' '}
                {[
                  coffeeState.cinnamonSprinkled ? 'cinnamon dust' : null,
                  coffeeState.vanillaDrizzled ? 'vanilla drizzle' : null,
                  coffeeState.iceCreamAdded ? 'ice cream scoop' : null,
                ]
                  .filter(Boolean)
                  .join(' & ')}
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Make Another Cup Action */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playPop();
          onBrewAgain();
        }}
        className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-300 hover:from-amber-500 hover:to-orange-400 text-[#4A2810] font-bubbly text-base font-bold flex items-center justify-center gap-2 mx-auto bubbly-shadow-caramel transition-all hover:scale-105 active:scale-95 cursor-pointer border border-amber-200/50"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Make Another Coffee! ☕</span>
      </button>
    </div>
  );
};
