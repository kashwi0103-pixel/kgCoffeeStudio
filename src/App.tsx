/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Coffee, Sparkles, Heart } from 'lucide-react';
import { AppStage, CoffeeState } from './types/coffee';
import { Preloader } from './components/Preloader';
import { IntroHero } from './components/IntroHero';
import { IngredientSelection } from './components/IngredientSelection';
import { BrewingStudio } from './components/BrewingStudio';
import { CelebrationView } from './components/CelebrationView';
import { AudioControls } from './components/AudioControls';
import { soundEngine } from './utils/audio';

export default function App() {
  const [stage, setStage] = useState<AppStage>('PRELOADER');
  const [customerName, setCustomerName] = useState<string>('Kashwi');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'mug',
    'coffee',
    'spoon',
    'sugar',
    'water',
    'frother',
  ]);
  const [finalCoffeeState, setFinalCoffeeState] = useState<CoffeeState>({
    coffeeAdded: true,
    sugarAdded: true,
    baseWaterAdded: true,
    frothProgress: 100,
    iceCubesCount: 3,
    isShaken: true,
    optionalWaterAdded: false,
    milkAdded: true,
    cinnamonSprinkled: true,
    vanillaDrizzled: true,
    iceCreamAdded: false,
    swirled: true,
    customerName: 'Kashwi',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F2] via-[#FDF3EE] to-[#FAF0E8] text-[#5C3D2E] relative overflow-x-hidden">
      {/* Floating Audio Controls */}
      <AudioControls />

      {/* Decorative Subtle Pastel Ambient Glows */}
      <div className="fixed top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-pink-200/25 blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-amber-200/25 blur-3xl pointer-events-none" />

      {/* Navigation Top Bar (shown after preloader) */}
      {stage !== 'PRELOADER' && (
        <header className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4 border-b border-pink-100/80">
          {/* Zone 1: Brand title wordmark */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playPop();
              setStage('INTRO');
            }}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
              <Coffee className="w-4 h-4" />
            </div>
            <span className="font-bubbly text-lg font-bold text-[#5C3D2E] whitespace-nowrap">
              KG Coffee Studio
            </span>
          </button>

          {/* Zone 2: Stage indicator */}
          <nav className="hidden sm:flex items-center gap-5 text-xs font-semibold text-[#8C6D60]">
            <button
              type="button"
              onClick={() => {
                soundEngine.playPop();
                setStage('INTRO');
              }}
              className={`hover:text-pink-600 transition-colors ${
                stage === 'INTRO' ? 'text-pink-600 underline underline-offset-4' : ''
              }`}
            >
              Intro
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playPop();
                setStage('INGREDIENTS');
              }}
              className={`hover:text-pink-600 transition-colors ${
                stage === 'INGREDIENTS' ? 'text-pink-600 underline underline-offset-4' : ''
              }`}
            >
              Ingredients
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playPop();
                setStage('BREW_BASE');
              }}
              className={`hover:text-pink-600 transition-colors ${
                stage === 'BREW_BASE' || stage === 'FROTHING' || stage === 'BUILD_DRINK'
                  ? 'text-pink-600 underline underline-offset-4'
                  : ''
              }`}
            >
              Brew Studio
            </button>
            {stage === 'READY' && (
              <span className="text-pink-600 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Ready!
              </span>
            )}
          </nav>

          {/* Zone 3: Whimsical status indicator */}
          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium text-pink-700 bg-pink-50/80 px-2.5 py-1 rounded-full border border-pink-100">
              <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
              <span>Sweet & Creamy</span>
            </span>
          </div>
        </header>
      )}

      {/* Main Dynamic View Controller */}
      <main className="relative z-10">
        {/* Stage 0: Coffee Preloader */}
        {stage === 'PRELOADER' && (
          <Preloader onComplete={() => setStage('INTRO')} />
        )}

        {/* Stage 1: "wanna make coffee?" Hero */}
        {stage === 'INTRO' && (
          <IntroHero
            onStart={(enteredName) => {
              setCustomerName(enteredName);
              setStage('INGREDIENTS');
            }}
          />
        )}

        {/* Stage 2: Ingredients Gathering Checklist */}
        {stage === 'INGREDIENTS' && (
          <IngredientSelection
            onComplete={(selected) => {
              setSelectedIngredients(selected);
              setStage('BREW_BASE');
            }}
            onBack={() => setStage('INTRO')}
          />
        )}

        {/* Stage 3: Step-by-Step Cooking / Brewing Studio */}
        {(stage === 'BREW_BASE' || stage === 'FROTHING' || stage === 'BUILD_DRINK') && (
          <BrewingStudio
            customerName={customerName}
            selectedIngredients={selectedIngredients}
            onComplete={(finalState) => {
              setFinalCoffeeState({
                ...finalState,
                customerName: customerName,
              });
              setStage('READY');
            }}
            onRestart={() => setStage('INTRO')}
          />
        )}

        {/* Stage 4: "Your coffee is ready." Celebration Screen */}
        {stage === 'READY' && (
          <CelebrationView
            coffeeState={finalCoffeeState}
            onBrewAgain={() => setStage('INGREDIENTS')}
          />
        )}
      </main>

      {/* Cozy Footer */}
      {stage !== 'PRELOADER' && (
        <footer className="text-center py-6 text-xs text-[#A8887B] border-t border-pink-100/60 max-w-4xl mx-auto px-4 mt-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} KG Coffee Studio · Handcrafted with cozy vibes</p>
          <div className="flex items-center gap-1 text-[#8C6D60]">
            <span>Brewed with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>& sweet whipped cream</span>
          </div>
        </footer>
      )}
    </div>
  );
}
