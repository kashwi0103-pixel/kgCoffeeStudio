/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Coffee,
  Zap,
  Check,
  Droplets,
} from 'lucide-react';
import { CoffeeState } from '../types/coffee';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';
import { DraggableProp } from './DraggableProp';
import {
  CoffeeSpoonIcon,
  SugarScoopIcon,
  WaterKettleIcon,
  ElectricFrotherIcon,
  IceCubeIcon,
  MilkCartonIcon,
  CinnamonShakerIcon,
  VanillaSyrupIcon,
  IceCreamScoopIcon,
} from './KawaiiIngredients';
import { soundEngine } from '../utils/audio';

interface BrewingStudioProps {
  customerName?: string;
  selectedIngredients: string[];
  onComplete: (finalState: CoffeeState) => void;
  onRestart: () => void;
}

type MainPhase = 'BASE' | 'FROTH' | 'BUILD';

export const BrewingStudio: React.FC<BrewingStudioProps> = ({
  customerName = 'Kashwi',
  selectedIngredients,
  onComplete,
  onRestart,
}) => {
  const [phase, setPhase] = useState<MainPhase>('BASE');

  // Coffee state
  const [coffeeState, setCoffeeState] = useState<CoffeeState>({
    coffeeAdded: false,
    sugarAdded: false,
    baseWaterAdded: false,
    frothProgress: 0,
    iceCubesCount: 0,
    isShaken: false,
    optionalWaterAdded: false,
    milkAdded: false,
    cinnamonSprinkled: false,
    vanillaDrizzled: false,
    iceCreamAdded: false,
    swirled: false,
    customerName: customerName,
  });

  // Transient animation states
  const [isAddingCoffee, setIsAddingCoffee] = useState(false);
  const [isAddingSugar, setIsAddingSugar] = useState(false);
  const [isPouringWater, setIsPouringWater] = useState(false);
  const [isPouringMilk, setIsPouringMilk] = useState(false);
  const [isAddingIce, setIsAddingIce] = useState(false);
  const [isFrothing, setIsFrothing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isSwirling, setIsSwirling] = useState(false);
  const [isTargetHovered, setIsTargetHovered] = useState(false);

  // Sub-step index for BUILD phase
  // 0: ice, 1: shake, 2: optional_water, 3: milk, 4: toppings, 5: swirl, 6: done
  const [buildStepIndex, setBuildStepIndex] = useState<number>(0);

  const cupTargetRef = useRef<HTMLDivElement | null>(null);
  const frothIntervalRef = useRef<number | null>(null);

  // Optional ingredients selected in Step 1
  const hasVanillaChoice = selectedIngredients.includes('vanilla');
  const hasCinnamonChoice = selectedIngredients.includes('cinnamon');
  const hasIceCreamChoice = selectedIngredients.includes('icecream');

  // --- ACTIONS: PHASE 1 (BASE STEP) ---
  const handleAddCoffee = () => {
    if (coffeeState.coffeeAdded) return;
    setIsAddingCoffee(true);
    soundEngine.playSprinkle();
    setTimeout(() => {
      setIsAddingCoffee(false);
      setCoffeeState((prev) => ({ ...prev, coffeeAdded: true }));
      soundEngine.playPop();
    }, 650);
  };

  const handleAddSugar = () => {
    if (coffeeState.sugarAdded) return;
    setIsAddingSugar(true);
    soundEngine.playSprinkle();
    setTimeout(() => {
      setIsAddingSugar(false);
      setCoffeeState((prev) => ({ ...prev, sugarAdded: true }));
      soundEngine.playPop();
    }, 650);
  };

  const handleAddBaseWater = () => {
    if (coffeeState.baseWaterAdded) return;
    setIsPouringWater(true);
    soundEngine.playPour();
    setTimeout(() => {
      setIsPouringWater(false);
      setCoffeeState((prev) => ({ ...prev, baseWaterAdded: true }));
      soundEngine.playBubble();
    }, 750);
  };

  const isBaseReady =
    coffeeState.coffeeAdded && coffeeState.sugarAdded && coffeeState.baseWaterAdded;

  // --- ACTIONS: PHASE 2 (FROTHING STEP) ---
  const startFrothing = () => {
    if (isFrothing || coffeeState.frothProgress >= 100) return;
    setIsFrothing(true);
    soundEngine.startFrother();

    frothIntervalRef.current = window.setInterval(() => {
      setCoffeeState((prev) => {
        const next = prev.frothProgress + 4;
        if (next >= 100) {
          stopFrothing();
          soundEngine.playCelebration();
          return { ...prev, frothProgress: 100 };
        }
        return { ...prev, frothProgress: next };
      });
    }, 80);
  };

  const stopFrothing = () => {
    if (frothIntervalRef.current) {
      clearInterval(frothIntervalRef.current);
      frothIntervalRef.current = null;
    }
    setIsFrothing(false);
    soundEngine.stopFrother();
  };

  useEffect(() => {
    return () => {
      if (frothIntervalRef.current) clearInterval(frothIntervalRef.current);
      soundEngine.stopFrother();
    };
  }, []);

  // --- ACTIONS: PHASE 3 (BUILD DRINK) ---
  const handleAddIce = () => {
    setIsAddingIce(true);
    soundEngine.playIceClink();
    setTimeout(() => {
      setIsAddingIce(false);
      setCoffeeState((prev) => ({ ...prev, iceCubesCount: 3 }));
      setBuildStepIndex(1); // advance to shake
    }, 600);
  };

  const handleShakeDrink = () => {
    setIsShaking(true);
    soundEngine.playShake();
    setTimeout(() => {
      setIsShaking(false);
      setCoffeeState((prev) => ({ ...prev, isShaken: true }));
      setBuildStepIndex(2); // advance to optional water
    }, 1100);
  };

  const handleOptionalWater = (skip: boolean) => {
    if (skip) {
      soundEngine.playPop();
      setBuildStepIndex(3); // skip straight to milk
      return;
    }
    setIsPouringWater(true);
    soundEngine.playPour();
    setTimeout(() => {
      setIsPouringWater(false);
      setCoffeeState((prev) => ({ ...prev, optionalWaterAdded: true }));
      setBuildStepIndex(3); // advance to milk
    }, 700);
  };

  const handleAddMilk = () => {
    setIsPouringMilk(true);
    soundEngine.playPour();
    setTimeout(() => {
      setIsPouringMilk(false);
      setCoffeeState((prev) => ({ ...prev, milkAdded: true }));
      soundEngine.playBubble();
      setBuildStepIndex(4); // advance to toppings
    }, 850);
  };

  const handleAddTopping = (type: 'cinnamon' | 'vanilla' | 'icecream') => {
    soundEngine.playPop();
    if (type === 'cinnamon') {
      soundEngine.playSprinkle();
      setCoffeeState((prev) => ({ ...prev, cinnamonSprinkled: true }));
    } else if (type === 'vanilla') {
      soundEngine.playBubble();
      setCoffeeState((prev) => ({ ...prev, vanillaDrizzled: true }));
    } else if (type === 'icecream') {
      soundEngine.playBubble();
      setCoffeeState((prev) => ({ ...prev, iceCreamAdded: true }));
    }
  };

  const handleSwirlDrink = () => {
    setIsSwirling(true);
    soundEngine.playSwirl();
    setTimeout(() => {
      setIsSwirling(false);
      setCoffeeState((prev) => ({ ...prev, swirled: true }));
      soundEngine.playBubble();
      setBuildStepIndex(6); // ready for Done!
    }, 1300);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 select-none">
      {/* Top Breadcrumb Steps Rail */}
      <div className="flex items-center justify-between gap-2 max-w-xl mx-auto mb-6 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-pink-200 shadow-sm text-xs font-semibold">
        {/* Step 1: Base */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            phase === 'BASE'
              ? 'bg-pink-500 text-white shadow-sm'
              : isBaseReady
              ? 'text-pink-600 bg-pink-50'
              : 'text-stone-400'
          }`}
        >
          <span>1. Mug Base</span>
          {isBaseReady && <Check className="w-3.5 h-3.5" />}
        </div>

        <span className="text-pink-300">➜</span>

        {/* Step 2: Froth */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            phase === 'FROTH'
              ? 'bg-amber-500 text-white shadow-sm'
              : coffeeState.frothProgress >= 100
              ? 'text-amber-700 bg-amber-50'
              : 'text-stone-400'
          }`}
        >
          <span>2. Froth</span>
          {coffeeState.frothProgress >= 100 && <Check className="w-3.5 h-3.5" />}
        </div>

        <span className="text-pink-300">➜</span>

        {/* Step 3: Build & Chill */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            phase === 'BUILD'
              ? 'bg-rose-500 text-white shadow-sm'
              : coffeeState.swirled
              ? 'text-rose-700 bg-rose-50'
              : 'text-stone-400'
          }`}
        >
          <span>3. Build & Swirl</span>
          {coffeeState.swirled && <Check className="w-3.5 h-3.5" />}
        </div>
      </div>

      {/* Main Kitchen Stage Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left / Center: Interactive Cup Target Area */}
        <div
          ref={cupTargetRef}
          className={`md:col-span-6 bg-gradient-to-b from-white via-[#FFF8F5] to-[#FDF0EC] rounded-3xl p-6 border-2 transition-all duration-300 flex flex-col items-center justify-center relative min-h-[400px] bubbly-card-shadow ${
            isTargetHovered
              ? 'border-pink-500 ring-4 ring-pink-300/60 bg-pink-50/50 scale-[1.02]'
              : 'border-pink-200/80'
          }`}
        >
          {/* Target Guidance Banner */}
          <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bubbly font-bold transition-all shadow-sm ${
                isTargetHovered
                  ? 'bg-pink-500 text-white scale-110 shadow-md animate-bounce'
                  : 'bg-white/80 text-[#7C594C] border border-pink-100'
              }`}
            >
              {isTargetHovered ? 'Drop it into the cup! ✨' : 'KG Coffee Mug Station ☕'}
            </span>
          </div>

          {/* Coffee Cup Visualization Canvas */}
          <div className="mt-4">
            <CoffeeCupCanvas
              coffeeState={coffeeState}
              isFrothing={isFrothing}
              isPouringWater={isPouringWater}
              isPouringMilk={isPouringMilk}
              isAddingCoffee={isAddingCoffee}
              isAddingSugar={isAddingSugar}
              isAddingIce={isAddingIce}
              isShaking={isShaking}
              isSwirling={isSwirling}
            />
          </div>

          {/* Frothing Meter (during Phase 2) */}
          {phase === 'FROTH' && (
            <div className="w-56 mt-3 flex flex-col items-center">
              <div className="flex justify-between w-full text-xs font-semibold text-[#6D4C41] mb-1">
                <span>Whipped Creaminess</span>
                <span className="text-amber-600 font-bold">{coffeeState.frothProgress}%</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full p-0.5 border border-amber-200 overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-rose-300 to-yellow-300 transition-all duration-100"
                  style={{ width: `${coffeeState.frothProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Cozy Kitchen Counter with Kawaii Draggable Props */}
        <div className="md:col-span-6 flex flex-col justify-between bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-sm space-y-4">
          {/* ================= PHASE 1: BASE STEP ================= */}
          {phase === 'BASE' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-semibold">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Base Step: Drag actual ingredients</span>
                </div>
                <span className="text-[11px] text-[#A8887B]">Drag or tap to pour</span>
              </div>

              <div>
                <h3 className="font-bubbly text-2xl font-bold text-[#5C3D2E]">
                  Add Coffee, Sugar & Splash of Water
                </h3>
                <p className="text-xs text-[#8C6D60] mt-1">
                  Pick up the cute wooden spoon, sugar scoop, or kettle and drag them over the mug:
                </p>
              </div>

              {/* Kawaii Draggable Counter Shelf */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#FFF5F2] to-[#FCE7F0]/40 border border-pink-200/80 shadow-inner">
                <p className="text-[11px] font-bold text-pink-600 uppercase tracking-wider mb-3 text-center">
                  Kitchen Counter (Drag into cup)
                </p>
                <div className="flex items-center justify-around gap-2">
                  {/* 1. Coffee Spoon */}
                  <DraggableProp
                    id="coffee-spoon"
                    name="Coffee"
                    hindiName="Coffee Powder"
                    isActive={!coffeeState.coffeeAdded}
                    isCompleted={coffeeState.coffeeAdded}
                    onDropSuccess={handleAddCoffee}
                    targetRectRef={cupTargetRef}
                    onHoverOverTarget={setIsTargetHovered}
                  >
                    <CoffeeSpoonIcon className="w-14 h-14" />
                  </DraggableProp>

                  {/* 2. Sugar Scoop */}
                  <DraggableProp
                    id="sugar-scoop"
                    name="Sugar"
                    hindiName="Cheeni"
                    isActive={coffeeState.coffeeAdded && !coffeeState.sugarAdded}
                    isCompleted={coffeeState.sugarAdded}
                    onDropSuccess={handleAddSugar}
                    targetRectRef={cupTargetRef}
                    onHoverOverTarget={setIsTargetHovered}
                  >
                    <SugarScoopIcon className="w-14 h-14" />
                  </DraggableProp>

                  {/* 3. Water Kettle */}
                  <DraggableProp
                    id="water-kettle"
                    name="Water"
                    hindiName="Thoda sa paani"
                    isActive={coffeeState.sugarAdded && !coffeeState.baseWaterAdded}
                    isCompleted={coffeeState.baseWaterAdded}
                    onDropSuccess={handleAddBaseWater}
                    targetRectRef={cupTargetRef}
                    onHoverOverTarget={setIsTargetHovered}
                  >
                    <WaterKettleIcon className="w-14 h-14" />
                  </DraggableProp>
                </div>
              </div>

              {/* Fallback Single-Click Action Buttons for Quick Play */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs text-[#8C6D60]">
                  <span>Prefer quick tap?</span>
                  <span className="text-[11px] text-pink-500 font-medium">Click buttons below</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={handleAddCoffee}
                    disabled={coffeeState.coffeeAdded}
                    className={`py-2 px-1 text-xs font-bubbly font-bold rounded-xl border transition-all ${
                      coffeeState.coffeeAdded
                        ? 'bg-stone-50 border-stone-200 text-stone-400'
                        : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-[#4A2810]'
                    }`}
                  >
                    {coffeeState.coffeeAdded ? '✓ Coffee' : '+ Coffee'}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddSugar}
                    disabled={!coffeeState.coffeeAdded || coffeeState.sugarAdded}
                    className={`py-2 px-1 text-xs font-bubbly font-bold rounded-xl border transition-all ${
                      coffeeState.sugarAdded
                        ? 'bg-stone-50 border-stone-200 text-stone-400'
                        : 'bg-pink-50 hover:bg-pink-100 border-pink-200 text-pink-900'
                    }`}
                  >
                    {coffeeState.sugarAdded ? '✓ Sugar' : '+ Sugar'}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddBaseWater}
                    disabled={!coffeeState.sugarAdded || coffeeState.baseWaterAdded}
                    className={`py-2 px-1 text-xs font-bubbly font-bold rounded-xl border transition-all ${
                      coffeeState.baseWaterAdded
                        ? 'bg-stone-50 border-stone-200 text-stone-400'
                        : 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-900'
                    }`}
                  >
                    {coffeeState.baseWaterAdded ? '✓ Water' : '+ Water'}
                  </button>
                </div>
              </div>

              {/* Advance to Froth */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playPop();
                    setPhase('FROTH');
                  }}
                  disabled={!isBaseReady}
                  className={`w-full py-3.5 rounded-2xl font-bubbly text-base font-bold flex items-center justify-center gap-2 transition-all ${
                    isBaseReady
                      ? 'bg-gradient-to-r from-amber-500 to-rose-400 hover:from-amber-600 hover:to-rose-500 text-white shadow-md cursor-pointer hover:scale-[1.02]'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <span>Next: Froth Coffee 🌀</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= PHASE 2: FROTHING STEP ================= */}
          {phase === 'FROTH' && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Step 2: Froth karna hai</span>
              </div>

              <div>
                <h3 className="font-bubbly text-2xl font-bold text-[#5C3D2E]">
                  Whip Into Fluffy Cream!
                </h3>
                <p className="text-xs text-[#8C6D60] mt-1">
                  Hold or tap the frother button to whisk the coffee into a thick golden Dalgona foam:
                </p>
              </div>

              {/* Big Frother Interactive Button */}
              <div className="flex flex-col items-center py-2">
                <button
                  type="button"
                  onMouseDown={startFrothing}
                  onMouseUp={stopFrothing}
                  onTouchStart={startFrothing}
                  onTouchEnd={stopFrothing}
                  onClick={() => {
                    if (coffeeState.frothProgress < 100 && !isFrothing) {
                      startFrothing();
                    }
                  }}
                  disabled={coffeeState.frothProgress >= 100}
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-200 border-4 cursor-pointer select-none ${
                    coffeeState.frothProgress >= 100
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-md'
                      : isFrothing
                      ? 'bg-amber-400 border-amber-500 text-white scale-105 shadow-xl animate-frother-vibrate'
                      : 'bg-gradient-to-tr from-amber-300 to-rose-300 hover:from-amber-400 hover:to-rose-400 border-white text-white bubbly-shadow'
                  }`}
                >
                  {coffeeState.frothProgress >= 100 ? (
                    <>
                      <Check className="w-8 h-8 mb-1" />
                      <span className="font-bubbly font-bold text-xs">Super Fluffy!</span>
                    </>
                  ) : (
                    <>
                      <ElectricFrotherIcon className="w-14 h-14 pointer-events-none drop-shadow" />
                      <span className="font-bubbly font-bold text-xs">
                        {isFrothing ? 'Frothing...' : 'Hold to Froth'}
                      </span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-[#A8887B] mt-2">
                  {coffeeState.frothProgress >= 100
                    ? 'Perfect whipped cloud achieved! ✨'
                    : 'Click or hold down to whip to 100%'}
                </p>
              </div>

              {/* Advance to Step 3 */}
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPop();
                  setPhase('BUILD');
                }}
                disabled={coffeeState.frothProgress < 100}
                className={`w-full py-3.5 rounded-2xl font-bubbly text-base font-bold flex items-center justify-center gap-2 transition-all ${
                  coffeeState.frothProgress >= 100
                    ? 'bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white shadow-md cursor-pointer hover:scale-[1.02]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <span>Next: Build Iced Coffee 🧊</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================= PHASE 3: BUILD DRINK ================= */}
          {phase === 'BUILD' && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Step 3: Drink Assemble Karna Hai</span>
              </div>

              {/* Sub-step 1: Ice Cubes with Draggable Kawaii Cube */}
              {buildStepIndex === 0 && (
                <div className="space-y-3">
                  <h3 className="font-bubbly text-2xl font-bold text-[#5C3D2E]">
                    1. Ice Cube Daalne Hain 🧊
                  </h3>
                  <p className="text-xs text-[#8C6D60]">
                    Drag the smiling ice cube from the counter into your cup:
                  </p>
                  <div className="flex justify-center p-3 bg-pink-50/50 rounded-2xl border border-pink-200">
                    <DraggableProp
                      id="ice-cube"
                      name="Ice Cubes"
                      hindiName="Chilled Ice"
                      isActive={true}
                      isCompleted={coffeeState.iceCubesCount > 0}
                      onDropSuccess={handleAddIce}
                      targetRectRef={cupTargetRef}
                      onHoverOverTarget={setIsTargetHovered}
                    >
                      <IceCubeIcon className="w-14 h-14" />
                    </DraggableProp>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddIce}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-white font-bubbly text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Tap to Drop Ice Cubes 🧊</span>
                  </button>
                </div>
              )}

              {/* Sub-step 2: Shake */}
              {buildStepIndex === 1 && (
                <div className="space-y-3">
                  <h3 className="font-bubbly text-2xl font-bold text-[#5C3D2E]">
                    2. Thodi Der Shake Karna Hai 🫨
                  </h3>
                  <p className="text-xs text-[#8C6D60]">
                    Give it an energetic shake to chill down the whipped coffee!
                  </p>
                  <button
                    type="button"
                    onClick={handleShakeDrink}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bubbly text-base font-bold flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] cursor-pointer"
                  >
                    <span>Shake & Chill! 🫨</span>
                  </button>
                </div>
              )}

              {/* Sub-step 3: Optional Water */}
              {buildStepIndex === 2 && (
                <div className="space-y-3">
                  <h3 className="font-bubbly text-2xl font-bold text-[#5C3D2E]">
                    3. Paani Daalna (Optional) 💧
                  </h3>
                  <p className="text-xs text-[#8C6D60]">
                    Add a light splash of water, or skip directly to pouring milk:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleOptionalWater(false)}
                      className="flex-1 py-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bubbly font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span>Add Splash of Water</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOptionalWater(true)}
                      className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bubbly font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                    >
                      <span>Skip to Milk 🥛 ➜</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Sub-step 4: Milk with Draggable Kawaii Milk Carton */}
              {buildStepIndex === 3 && (
                <div className="space-y-3">
                  <h3 className="font-bubbly text-2xl font-bold text-[#5C3D2E]">
                    4. Milk Daalna Hoga 🥛
                  </h3>
                  <p className="text-xs text-[#8C6D60]">
                    Drag the cute strawberry-milk carton from the counter to pour:
                  </p>
                  <div className="flex justify-center p-3 bg-pink-50/50 rounded-2xl border border-pink-200">
                    <DraggableProp
                      id="milk-carton"
                      name="Fresh Milk"
                      hindiName="Chilled Milk"
                      isActive={true}
                      isCompleted={coffeeState.milkAdded}
                      onDropSuccess={handleAddMilk}
                      targetRectRef={cupTargetRef}
                      onHoverOverTarget={setIsTargetHovered}
                    >
                      <MilkCartonIcon className="w-14 h-14" />
                    </DraggableProp>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddMilk}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-300 to-pink-300 hover:from-rose-400 hover:to-pink-400 text-[#4A2810] font-bubbly text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Tap to Pour Chilled Milk 🥛</span>
                  </button>
                </div>
              )}

              {/* Sub-step 5: Toppings with Draggable Props */}
              {buildStepIndex === 4 && (
                <div className="space-y-3">
                  <h3 className="font-bubbly text-2xl font-bold text-[#5C3D2E]">
                    5. Cinnamon & Vanilla Syrup ✨
                  </h3>
                  <p className="text-xs text-[#8C6D60]">
                    Drag each topping or tap below to sprinkle and drizzle:
                  </p>

                  <div className="flex items-center justify-around p-3 bg-amber-50/50 rounded-2xl border border-amber-200">
                    {/* Cinnamon Shaker */}
                    <DraggableProp
                      id="cinnamon-shaker"
                      name="Cinnamon"
                      hindiName="Dalchini"
                      isActive={!coffeeState.cinnamonSprinkled}
                      isCompleted={coffeeState.cinnamonSprinkled}
                      onDropSuccess={() => handleAddTopping('cinnamon')}
                      targetRectRef={cupTargetRef}
                      onHoverOverTarget={setIsTargetHovered}
                    >
                      <CinnamonShakerIcon className="w-12 h-12" />
                    </DraggableProp>

                    {/* Vanilla Syrup Bottle */}
                    <DraggableProp
                      id="vanilla-bottle"
                      name="Vanilla Syrup"
                      hindiName="Vanilla Drizzle"
                      isActive={!coffeeState.vanillaDrizzled}
                      isCompleted={coffeeState.vanillaDrizzled}
                      onDropSuccess={() => handleAddTopping('vanilla')}
                      targetRectRef={cupTargetRef}
                      onHoverOverTarget={setIsTargetHovered}
                    >
                      <VanillaSyrupIcon className="w-12 h-12" />
                    </DraggableProp>

                    {/* Ice Cream Scoop (if selected) */}
                    {hasIceCreamChoice && (
                      <DraggableProp
                        id="icecream-scoop"
                        name="Ice Cream"
                        hindiName="Vanilla Scoop"
                        isActive={!coffeeState.iceCreamAdded}
                        isCompleted={coffeeState.iceCreamAdded}
                        onDropSuccess={() => handleAddTopping('icecream')}
                        targetRectRef={cupTargetRef}
                        onHoverOverTarget={setIsTargetHovered}
                      >
                        <IceCreamScoopIcon className="w-12 h-12" />
                      </DraggableProp>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playPop();
                      setBuildStepIndex(5); // advance to swirl
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bubbly font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Next: Ek Swirl Karke Mix Karna Hai 🌀</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Sub-step 6: Swirl to Mix */}
              {buildStepIndex === 5 && (
                <div className="space-y-3">
                  <h3 className="font-bubbly text-2xl font-bold text-[#5C3D2E]">
                    6. Ek Swirl Karke Mix Karna Hai 🌀
                  </h3>
                  <p className="text-xs text-[#8C6D60]">
                    Swirl the straw to blend the cold milk and whipped dalgona coffee together!
                  </p>
                  <button
                    type="button"
                    onClick={handleSwirlDrink}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-amber-400 hover:from-rose-500 hover:to-amber-500 text-white font-bubbly text-base font-bold flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] cursor-pointer"
                  >
                    <span>Swirl & Blend! 🌀</span>
                  </button>
                </div>
              )}

              {/* Sub-step 7: Done! */}
              {buildStepIndex >= 6 && (
                <div className="space-y-3 text-center py-2">
                  <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-700 mb-1">
                    <Check className="w-7 h-7 stroke-[3]" />
                  </div>
                  <h3 className="font-bubbly text-3xl font-bold text-[#5C3D2E]">
                    7. Done! ✨
                  </h3>
                  <p className="text-xs text-[#8C6D60]">
                    Your KG Coffee Studio signature cup has been mixed to perfection!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playCelebration();
                      onComplete(coffeeState);
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 hover:from-pink-600 hover:to-amber-500 text-white font-bubbly text-lg font-bold flex items-center justify-center gap-2.5 shadow-lg bubbly-shadow hover:scale-[1.02] cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" />
                    <span>See Your Ready Coffee! ☕</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Restart Control */}
          <div className="flex justify-end pt-2 border-t border-pink-100">
            <button
              type="button"
              onClick={() => {
                soundEngine.playPop();
                onRestart();
              }}
              className="text-xs font-semibold text-[#8C6D60] hover:text-[#5C3D2E] flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-full hover:bg-stone-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start Over</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
