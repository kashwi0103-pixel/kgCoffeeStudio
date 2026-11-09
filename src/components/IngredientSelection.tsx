/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { IngredientItem } from '../types/coffee';
import { soundEngine } from '../utils/audio';

interface IngredientSelectionProps {
  onComplete: (selectedIngredients: string[]) => void;
  onBack: () => void;
}

const INITIAL_INGREDIENTS: IngredientItem[] = [
  {
    id: 'mug',
    name: 'Coffee Mug',
    hindiName: 'Mug',
    icon: '☕',
    isOptional: false,
    description: 'Your favorite cute ceramic or glass mug',
    selected: true,
  },
  {
    id: 'coffee',
    name: 'Coffee Powder',
    hindiName: 'Coffee',
    icon: '🫘',
    isOptional: false,
    description: 'Instant rich coffee granules',
    selected: true,
  },
  {
    id: 'spoon',
    name: 'Spoon',
    hindiName: 'Chammach',
    icon: '🥄',
    isOptional: false,
    description: 'For measuring & mixing',
    selected: true,
  },
  {
    id: 'sugar',
    name: 'Sugar',
    hindiName: 'Cheeni',
    icon: '🍬',
    isOptional: false,
    description: 'Granulated sugar or sweetener',
    selected: true,
  },
  {
    id: 'water',
    name: 'Water',
    hindiName: 'Paani',
    icon: '💧',
    isOptional: false,
    description: 'Warm water to melt and froth',
    selected: true,
  },
  {
    id: 'frother',
    name: 'Frother',
    hindiName: 'Frother ya Whisk',
    icon: '🌀',
    isOptional: false,
    description: 'Handheld electric frother or mini whisk',
    selected: true,
  },
  {
    id: 'vanilla',
    name: 'Vanilla Syrup',
    hindiName: 'Vanilla Syrup',
    icon: '🍯',
    isOptional: true,
    description: 'Sweet fragrant vanilla extract/syrup',
    selected: false,
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon',
    hindiName: 'Dalchini Powder',
    icon: '🍂',
    isOptional: true,
    description: 'Warm spiced dusting powder',
    selected: false,
  },
  {
    id: 'icecream',
    name: 'Ice Cream',
    hindiName: 'Ice Cream',
    icon: '🍦',
    isOptional: true,
    description: 'Creamy vanilla scoop on top',
    selected: false,
  },
];

export const IngredientSelection: React.FC<IngredientSelectionProps> = ({
  onComplete,
  onBack,
}) => {
  const [ingredients, setIngredients] = useState<IngredientItem[]>(INITIAL_INGREDIENTS);

  const toggleItem = (id: string) => {
    soundEngine.playBubble();
    setIngredients((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectAll = () => {
    soundEngine.playPop();
    setIngredients((prev) => prev.map((item) => ({ ...item, selected: true })));
  };

  const requiredItems = ingredients.filter((item) => !item.isOptional);
  const selectedRequiredCount = requiredItems.filter((item) => item.selected).length;
  const allRequiredSelected = selectedRequiredCount === requiredItems.length;

  const handleNext = () => {
    soundEngine.playPop();
    const selectedIds = ingredients.filter((i) => i.selected).map((i) => i.id);
    onComplete(selectedIds);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Header / Subheading */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 text-pink-700 text-xs font-semibold mb-3 border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Step 1: Get Ingredients</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bubbly font-bold text-[#5C3D2E] mb-2">
          Gather Your Coffee Essentials
        </h2>
        <p className="text-sm sm:text-base text-[#856353] max-w-lg mx-auto">
          Apne saare ingredients ready kar lo! Click cards below to check them off your kitchen list:
        </p>

        {/* Counter & Select All quick button */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs font-medium">
          <span className="px-3 py-1.5 rounded-full bg-white border border-pink-200 text-[#7C594C] shadow-sm">
            Essentials gathered: <strong className="text-pink-600">{selectedRequiredCount}</strong> / {requiredItems.length}
          </span>
          <button
            type="button"
            onClick={selectAll}
            className="px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-pink-500" />
            <span>Select All (Ready!)</span>
          </button>
        </div>
      </div>

      {/* Grid of Ingredient Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {ingredients.map((item) => {
          const isSelected = item.selected;
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2 flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-white to-pink-50/60 border-pink-400 bubbly-card-shadow scale-[1.02]'
                  : 'bg-white/80 border-stone-200 hover:border-pink-200 hover:bg-white opacity-85'
              }`}
            >
              {/* Optional/Required Tag */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full ${
                    item.isOptional
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}
                >
                  {item.isOptional ? 'Optional' : 'Required'}
                </span>

                {/* Checkbox circle */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-pink-500 text-white shadow-sm'
                      : 'border-2 border-stone-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* Icon & Name */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-2xl shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bubbly text-lg font-bold text-[#5C3D2E] leading-snug">
                    {item.name}
                  </h3>
                  {item.hindiName && (
                    <p className="text-xs text-pink-600 font-medium">{item.hindiName}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#8C6D60] leading-relaxed mt-1">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-pink-100">
        <button
          type="button"
          onClick={() => {
            soundEngine.playPop();
            onBack();
          }}
          className="text-xs font-semibold text-[#8C6D60] hover:text-[#5C3D2E] px-4 py-2 rounded-full hover:bg-white/60 transition-colors"
        >
          ← Back to Start
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bubbly text-base sm:text-lg font-bold tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md ${
            allRequiredSelected
              ? 'bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white bubbly-shadow cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5'
              : 'bg-stone-300 text-stone-500 cursor-not-allowed'
          }`}
          disabled={!allRequiredSelected}
        >
          <span>Next: Start Brewing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {!allRequiredSelected && (
        <p className="text-center text-xs text-rose-500 mt-3 font-medium">
          Please check off all required ingredients to continue!
        </p>
      )}
    </div>
  );
};
