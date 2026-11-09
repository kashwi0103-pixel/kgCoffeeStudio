/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CoffeeState } from '../types/coffee';

interface CoffeeCupCanvasProps {
  coffeeState: CoffeeState;
  showNameTag?: boolean;
  isFrothing?: boolean;
  isPouringWater?: boolean;
  isPouringMilk?: boolean;
  isAddingCoffee?: boolean;
  isAddingSugar?: boolean;
  isAddingIce?: boolean;
  isShaking?: boolean;
  isSwirling?: boolean;
}

export const CoffeeCupCanvas: React.FC<CoffeeCupCanvasProps> = ({
  coffeeState,
  showNameTag = false,
  isFrothing = false,
  isPouringWater = false,
  isPouringMilk = false,
  isAddingCoffee = false,
  isAddingSugar = false,
  isAddingIce = false,
  isShaking = false,
  isSwirling = false,
}) => {
  const {
    coffeeAdded,
    sugarAdded,
    baseWaterAdded,
    frothProgress,
    iceCubesCount,
    milkAdded,
    cinnamonSprinkled,
    vanillaDrizzled,
    iceCreamAdded,
    swirled,
  } = coffeeState;

  // Determine foam height (0 to 55px) based on frothProgress
  const foamHeight = Math.min(Math.round((frothProgress / 100) * 55), 55);

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-6 select-none transition-transform duration-300 ${
        isShaking ? 'animate-bounce' : ''
      }`}
    >
      {/* Active Pouring Streams (Above Cup) */}
      <div className="relative h-20 w-48 flex justify-center items-end">
        {/* Steam Wisps when warm */}
        {baseWaterAdded && !milkAdded && (
          <div className="flex gap-2 mb-1">
            <span className="w-1.5 h-6 rounded-full bg-pink-300 animate-steam" />
            <span
              className="w-2 h-8 rounded-full bg-amber-300 animate-steam"
              style={{ animationDelay: '0.3s' }}
            />
            <span
              className="w-1.5 h-7 rounded-full bg-pink-300 animate-steam"
              style={{ animationDelay: '0.6s' }}
            />
          </div>
        )}

        {/* Falling Coffee Powder Animation */}
        {isAddingCoffee && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-10 bg-[#4A2810] rounded-full animate-bounce" />
            <span className="w-2 h-14 bg-[#5C3317] rounded-full animate-bounce delay-75" />
            <span className="w-1.5 h-12 bg-[#3D200B] rounded-full animate-bounce delay-150" />
          </div>
        )}

        {/* Falling Sugar Animation */}
        {isAddingSugar && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 animate-pulse">
            <span className="w-1 h-12 bg-white rounded-full animate-bounce" />
            <span className="w-1.5 h-16 bg-pink-100 rounded-full animate-bounce delay-75" />
            <span className="w-1 h-14 bg-white rounded-full animate-bounce delay-150" />
          </div>
        )}

        {/* Pouring Water Stream */}
        {isPouringWater && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <div className="w-2.5 h-16 bg-gradient-to-b from-blue-200/80 to-blue-300/90 rounded-full animate-pulse shadow-sm" />
          </div>
        )}

        {/* Pouring Milk Stream */}
        {isPouringMilk && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <div className="w-3.5 h-20 bg-gradient-to-b from-white to-pink-50 rounded-full animate-pulse shadow-sm" />
          </div>
        )}

        {/* Dropping Ice Animation */}
        {isAddingIce && (
          <div className="absolute inset-x-0 bottom-2 flex justify-center">
            <div className="w-7 h-7 rounded-lg bg-cyan-100/80 border border-cyan-200/90 animate-bounce shadow-md transform rotate-12" />
          </div>
        )}

        {/* Frother Device Descending */}
        {isFrothing && (
          <div className="absolute bottom-[-10px] flex flex-col items-center animate-frother-vibrate z-30">
            {/* Frother Handle */}
            <div className="w-5 h-20 rounded-t-lg bg-gradient-to-r from-pink-400 to-rose-400 shadow-md border border-pink-300" />
            {/* Metal Shaft */}
            <div className="w-1 h-16 bg-stone-300" />
            {/* Frother Whisk Coil */}
            <div className="w-6 h-3 rounded-full border-2 border-stone-400 bg-stone-200 shadow-sm animate-spin" />
          </div>
        )}

        {/* Swirling Straw / Spoon */}
        {isSwirling && (
          <div className="absolute bottom-[-15px] z-30 flex flex-col items-center animate-swirl origin-bottom">
            <div className="w-2 h-28 bg-gradient-to-b from-rose-400 via-pink-300 to-amber-200 rounded-full shadow-md" />
          </div>
        )}
      </div>

      {/* Main Glass / Mug SVG Container */}
      <div className="relative">
        <svg
          width="200"
          height="230"
          viewBox="0 0 200 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          {/* Saucer / Coaster */}
          <ellipse cx="100" cy="220" rx="80" ry="10" fill="#FCE7ED" />
          <ellipse cx="100" cy="217" rx="70" ry="7" fill="#F8B4C8" opacity="0.6" />

          {/* Cup Handle (Pink Ceramic Accent) */}
          <path
            d="M152 70 C190 70 190 145 152 155"
            stroke="#F472B6"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M152 73 C184 73 184 142 152 152"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cup Outer Transparent Glass / Ceramic Body */}
          <path
            d="M40 40 H160 L146 195 C145 204 138 210 128 210 H72 C62 210 55 204 54 195 L40 40 Z"
            fill="#FFFFFF"
            fillOpacity="0.45"
            stroke="#FCE7ED"
            strokeWidth="4"
          />

          {/* Inner Liquid Clipping Mask */}
          <defs>
            <clipPath id="cupInnerClip">
              <path d="M44 45 H156 L143 192 C142 199 136 205 127 205 H73 C64 205 58 199 57 192 L44 45 Z" />
            </clipPath>
          </defs>

          {/* Liquid Contents inside Clip */}
          <g clipPath="url(#cupInnerClip)">
            {/* Step: Base Granules (Coffee & Sugar) */}
            {coffeeAdded && !baseWaterAdded && (
              <g>
                {/* Coffee Granules Bed */}
                <path
                  d="M50 175 Q100 165 150 175 L143 205 H57 Z"
                  fill="#4A2810"
                />
                {/* Texture dots */}
                <circle cx="80" cy="182" r="2" fill="#2E1708" />
                <circle cx="100" cy="180" r="2.5" fill="#5C3317" />
                <circle cx="120" cy="184" r="2" fill="#2E1708" />
              </g>
            )}

            {sugarAdded && !baseWaterAdded && (
              <g>
                {/* Sugar Crystals on top */}
                <path
                  d="M60 172 Q100 166 140 172 L140 178 Q100 172 60 178 Z"
                  fill="#FFF8F0"
                />
                <circle cx="85" cy="172" r="1.5" fill="#FFFFFF" />
                <circle cx="105" cy="170" r="1.5" fill="#FFFFFF" />
                <circle cx="115" cy="173" r="1.5" fill="#FFFFFF" />
              </g>
            )}

            {/* Base Water Added -> Dark Coffee Extract Liquid */}
            {baseWaterAdded && frothProgress < 20 && !milkAdded && (
              <g>
                <path
                  d="M52 155 Q100 152 148 155 L143 205 H57 Z"
                  fill="#3E1F09"
                />
                <ellipse cx="100" cy="155" rx="48" ry="4" fill="#5C3317" />
              </g>
            )}

            {/* Frothing Progress in action / Golden whipped foam rising */}
            {frothProgress >= 20 && (
              <g>
                {/* Dark Base liquid (shrinking as it aerates into foam) */}
                <path
                  d="M54 175 Q100 172 146 175 L143 205 H57 Z"
                  fill="#3E1F09"
                />

                {/* Whipped Fluffy Foam Layer */}
                <path
                  d={`M48 ${175 - foamHeight} Q100 ${168 - foamHeight} 152 ${
                    175 - foamHeight
                  } L146 175 Q100 172 54 175 Z`}
                  fill={frothProgress > 80 ? '#DDB892' : '#B07D62'}
                />

                {/* Foam Pillowy Bubbles on Top */}
                <g opacity="0.95">
                  <circle cx="70" cy={172 - foamHeight} r="9" fill="#E6CCB2" />
                  <circle cx="95" cy={170 - foamHeight} r="11" fill="#EDE0D4" />
                  <circle cx="120" cy={171 - foamHeight} r="10" fill="#E6CCB2" />
                  <circle cx="135" cy={173 - foamHeight} r="7" fill="#DDB892" />
                  <circle cx="58" cy={174 - foamHeight} r="7" fill="#DDB892" />
                </g>
              </g>
            )}

            {/* Milk Pour / Full Drink Assembly Layer */}
            {milkAdded && (
              <g>
                {/* Chilled Milk Base */}
                <path
                  d="M48 90 Q100 85 152 90 L143 205 H57 Z"
                  fill={swirled ? '#E8C5A5' : '#FFFBF5'}
                />

                {/* Marbling Coffee swirl ribbons if not yet fully blended */}
                {!swirled && (
                  <g opacity="0.75">
                    <path
                      d="M70 110 C85 130 65 160 90 190"
                      stroke="#8B5A2B"
                      strokeWidth="9"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M125 105 C110 135 135 155 110 195"
                      stroke="#A0693B"
                      strokeWidth="7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                )}

                {/* Whipped Dalgona Foam Cap Floating on Top */}
                <path
                  d="M46 72 Q100 65 154 72 L152 92 Q100 85 48 92 Z"
                  fill="#DDB892"
                />
                <circle cx="75" cy="74" r="10" fill="#E6CCB2" />
                <circle cx="100" cy="72" r="12" fill="#EDE0D4" />
                <circle cx="125" cy="73" r="10" fill="#E6CCB2" />
              </g>
            )}

            {/* Ice Cubes inside the Drink */}
            {iceCubesCount > 0 && (
              <g>
                {/* Ice Cube 1 */}
                <rect
                  x="70"
                  y={milkAdded ? 120 : 160}
                  width="22"
                  height="22"
                  rx="4"
                  fill="#E0F2FE"
                  fillOpacity="0.85"
                  stroke="#BAE6FD"
                  strokeWidth="1.5"
                  transform={`rotate(14 81 ${milkAdded ? 131 : 171})`}
                />
                {/* Ice Cube 2 */}
                {iceCubesCount >= 2 && (
                  <rect
                    x="105"
                    y={milkAdded ? 130 : 165}
                    width="20"
                    height="20"
                    rx="4"
                    fill="#E0F2FE"
                    fillOpacity="0.8"
                    stroke="#BAE6FD"
                    strokeWidth="1.5"
                    transform={`rotate(-18 115 ${milkAdded ? 140 : 175})`}
                  />
                )}
                {/* Ice Cube 3 */}
                {iceCubesCount >= 3 && (
                  <rect
                    x="85"
                    y={milkAdded ? 100 : 150}
                    width="20"
                    height="20"
                    rx="4"
                    fill="#E0F2FE"
                    fillOpacity="0.85"
                    stroke="#BAE6FD"
                    strokeWidth="1.5"
                    transform={`rotate(8 95 ${milkAdded ? 110 : 160})`}
                  />
                )}
              </g>
            )}

            {/* Optional Ice Cream Scoop */}
            {iceCreamAdded && (
              <g>
                <circle cx="100" cy="62" r="18" fill="#FFFBEB" stroke="#FEF3C7" strokeWidth="2" />
                <circle cx="94" cy="58" r="3" fill="#FFFFFF" />
              </g>
            )}

            {/* Optional Vanilla Syrup Drizzle Ribbon */}
            {vanillaDrizzled && (
              <path
                d="M75 70 Q90 62 100 70 T125 70"
                stroke="#F59E0B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
            )}

            {/* Optional Cinnamon Powder Specks */}
            {cinnamonSprinkled && (
              <g fill="#78350F" opacity="0.8">
                <circle cx="82" cy="68" r="1" />
                <circle cx="88" cy="72" r="1.2" />
                <circle cx="96" cy="66" r="1" />
                <circle cx="106" cy="70" r="1.4" />
                <circle cx="114" cy="67" r="1" />
                <circle cx="120" cy="72" r="1.2" />
                <circle cx="100" cy="75" r="1" />
              </g>
            )}
          </g>

          {/* Cute Face on Mug */}
          <g>
            {/* Left Eye */}
            <circle cx="86" cy="150" r="3" fill="#6B4B3E" />
            {/* Right Eye */}
            <circle cx="114" cy="150" r="3" fill="#6B4B3E" />
            {/* Cheeks */}
            <circle cx="78" cy="155" r="3.5" fill="#F472B6" opacity="0.5" />
            <circle cx="122" cy="155" r="3.5" fill="#F472B6" opacity="0.5" />
            {/* Smile */}
            <path
              d="M96 156 Q100 161 104 156"
              stroke="#6B4B3E"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Starbucks-style Barista Handwritten Name Label on Cup (Applied at the end when ready) */}
          {showNameTag && coffeeState.customerName && (
            <g transform="rotate(-3 100 174)" className="animate-gentle-pulse">
              {/* White Barista Cup Sticker */}
              <rect
                x="56"
                y="158"
                width="88"
                height="32"
                rx="6"
                fill="#FFFFFF"
                fillOpacity="0.95"
                stroke="#FBCFE8"
                strokeWidth="1.5"
                filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.08))"
              />
              {/* Subtle top studio mark */}
              <text
                x="100"
                y="166"
                textAnchor="middle"
                fill="#9D174D"
                fontSize="6"
                fontWeight="700"
                letterSpacing="0.8"
                fontFamily="system-ui, sans-serif"
              >
                KG COFFEE STUDIO
              </text>
              {/* Barista handwritten customer name with heart */}
              <text
                x="100"
                y="180"
                textAnchor="middle"
                fill="#1E293B"
                fontSize={coffeeState.customerName.length > 9 ? '9' : '11'}
                fontWeight="700"
                fontFamily="'Fredoka', cursive, sans-serif"
              >
                {coffeeState.customerName} ♡
              </text>
            </g>
          )}

          {/* Glass Highlights / Reflections */}
          <path
            d="M50 50 L60 190"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M56 60 L62 170"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Straw (Inserted in final iced drink) */}
          {(milkAdded || swirled) && (
            <g>
              <line
                x1="68"
                y1="20"
                x2="88"
                y2="135"
                stroke="#FB7185"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <line
                x1="69"
                y1="22"
                x2="77"
                y2="70"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
