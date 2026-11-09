/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Heart, Coffee, ArrowRight, User } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface IntroHeroProps {
  onStart: (customerName: string) => void;
}

export const IntroHero: React.FC<IntroHeroProps> = ({ onStart }) => {
  const [showNameModal, setShowNameModal] = useState(false);
  const [name, setName] = useState('');

  const handleYes = () => {
    soundEngine.playPop();
    setShowNameModal(true);
  };

  const handleConfirmName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundEngine.playBubble();
    const finalName = name.trim() || 'Kashwi';
    onStart(finalName);
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center text-center px-4 py-12 select-none overflow-hidden">
      {/* Whimsical Pastel Floating Atmosphere Background */}
      <div className="absolute top-10 left-12 w-32 h-32 rounded-full bg-pink-100/60 blur-2xl animate-gentle-pulse pointer-events-none" />
      <div className="absolute bottom-12 right-10 w-40 h-40 rounded-full bg-amber-100/60 blur-2xl animate-gentle-pulse pointer-events-none" />
      <div className="absolute top-1/4 right-16 w-24 h-24 rounded-full bg-rose-100/50 blur-xl pointer-events-none" />

      {/* Floating Cute Coffee Stickers */}
      <div className="relative mb-6">
        {/* Steam Curls */}
        <div className="flex justify-center items-center gap-2 mb-1 h-8">
          <span className="w-1.5 h-6 rounded-full bg-pink-300 animate-steam" />
          <span
            className="w-2 h-8 rounded-full bg-amber-300 animate-steam"
            style={{ animationDelay: '0.4s' }}
          />
          <span
            className="w-1.5 h-6 rounded-full bg-pink-300 animate-steam"
            style={{ animationDelay: '0.8s' }}
          />
        </div>

        {/* Mascot Mug / Icon Illustration */}
        <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-tr from-rose-100 via-pink-50 to-amber-50 border-2 border-pink-200/80 bubbly-shadow p-4 transform hover:scale-105 transition-transform duration-300">
          <svg
            viewBox="0 0 80 80"
            className="w-20 h-20 drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cup */}
            <rect x="18" y="24" width="36" height="40" rx="8" fill="#FFFDFD" stroke="#F472B6" strokeWidth="3" />
            {/* Liquid inside */}
            <rect x="22" y="32" width="28" height="30" rx="5" fill="#B45309" opacity="0.85" />
            {/* Whipped Cream Top */}
            <path
              d="M18 24 C18 16 26 14 36 14 C46 14 54 16 54 24 Z"
              fill="#FFF8F0"
              stroke="#FCE7ED"
              strokeWidth="2"
            />
            {/* Handle */}
            <path
              d="M54 34 C64 34 66 50 54 54"
              stroke="#F472B6"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cute eyes & smile */}
            <circle cx="31" cy="46" r="2.2" fill="#5D4037" />
            <circle cx="41" cy="46" r="2.2" fill="#5D4037" />
            <path d="M34 50 Q36 53 38 50" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />
            {/* Straw */}
            <line x1="28" y1="8" x2="38" y2="30" stroke="#FB7185" strokeWidth="4" strokeLinecap="round" />
            <line x1="29" y1="9" x2="33" y2="18" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* Little Floating Heart Badge */}
          <div className="absolute -top-2 -right-2 bg-pink-500 text-white p-1.5 rounded-full shadow-md animate-bounce">
            <Heart className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>
      </div>

      {/* Playful Brand Tagline with KG Coffee Studio */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-bold mb-4 tracking-wide shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        <span>Welcome to KG Coffee Studio</span>
      </div>

      {/* Main Bubbly Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bubbly font-bold tracking-tight text-[#5C3D2E] mb-4 max-w-xl leading-tight">
        wanna make{' '}
        <span className="relative inline-block text-pink-600 underline decoration-wavy decoration-pink-300 decoration-2">
          coffee?
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#856353] max-w-md mx-auto mb-10 font-medium">
        Take a gentle break at KG Coffee Studio. Let's make an ultra-creamy, frothy iced coffee together!
      </p>

      {/* The Two "Yes" or "Yes" Options */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        {/* Option 1: Yes */}
        <button
          type="button"
          onClick={handleYes}
          className="group relative w-full sm:w-auto min-w-[170px] px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bubbly text-xl font-bold tracking-wide bubbly-shadow transition-all duration-200 hover:-translate-y-1 active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>yes 💕</span>
          <Heart className="w-5 h-5 fill-white/80 group-hover:scale-125 transition-transform" />
        </button>

        {/* Option 2: Yes (also yes!) */}
        <button
          type="button"
          onClick={handleYes}
          className="group relative w-full sm:w-auto min-w-[170px] px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-300 hover:from-amber-500 hover:to-orange-400 text-[#4A2810] font-bubbly text-xl font-bold tracking-wide bubbly-shadow-caramel transition-all duration-200 hover:-translate-y-1 active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border border-amber-200/50"
        >
          <span>yes, please! ☕</span>
          <Coffee className="w-5 h-5 text-[#4A2810] group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Cute Footer Hint */}
      <p className="text-xs text-[#A8887B] mt-8 font-medium">
        Tip: No matter which one you pick, delicious coffee awaits you!
      </p>

      {/* ================= STARBUCKS-STYLE NAME POPUP MODAL ================= */}
      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-b from-white via-[#FFF9F6] to-[#FDF0EC] rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-pink-200 shadow-2xl relative text-center animate-gentle-pulse">
            {/* Cute Barista Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-3 border border-pink-200">
              <Coffee className="w-3.5 h-3.5 text-pink-500" />
              <span>KG Coffee Barista Counter</span>
            </div>

            <h3 className="font-bubbly text-2xl sm:text-3xl font-bold text-[#5C3D2E] mb-2">
              Cup Pe Kiska Naam Likhein? ☕
            </h3>
            <p className="text-xs sm:text-sm text-[#8C6D60] mb-5">
              Starbucks style mein cup ke upar aapka handwritten naam aayega!
            </p>

            {/* Cup Sticker Preview */}
            <div className="bg-white rounded-2xl p-4 border border-pink-200 shadow-inner max-w-xs mx-auto mb-5 transform -rotate-1">
              <span className="text-[10px] tracking-widest text-[#9D174D] font-bold block mb-1">
                ★ KG COFFEE STUDIO ★
              </span>
              <p className="font-bubbly text-xl font-bold text-[#1E293B]">
                {name.trim() || 'Kashwi'} ♡
              </p>
              <span className="text-[10px] text-stone-400 block mt-1">Special Handcrafted Order</span>
            </div>

            {/* Name Input Form */}
            <form onSubmit={handleConfirmName} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name (e.g. Kashwi)..."
                  maxLength={18}
                  autoFocus
                  className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none text-base font-bubbly font-bold text-[#4A2810] placeholder:text-stone-300 text-center shadow-sm"
                />
                <User className="w-4 h-4 text-pink-400 absolute left-4 top-4" />
              </div>

              {/* Quick Choice Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Kashwi', 'Chhavi', 'Sweetie', 'Coffee Lover'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      soundEngine.playPop();
                      setName(preset);
                    }}
                    className="text-xs px-2.5 py-1 rounded-full bg-white hover:bg-pink-50 text-[#7C594C] border border-pink-200 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 hover:from-pink-600 hover:to-amber-500 text-white font-bubbly text-base font-bold flex items-center justify-center gap-2 shadow-md bubbly-shadow hover:scale-[1.02] cursor-pointer"
              >
                <span>Write on Cup & Get Ingredients</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
