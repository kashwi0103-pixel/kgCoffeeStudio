/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// 1. Kawaii Wooden Coffee Spoon
export const CoffeeSpoonIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wooden Handle */}
    <path
      d="M72 14 L42 44 C40 46 36 46 34 44 L32 42 C30 40 30 36 32 34 L62 4 C64 2 68 2 70 4 L72 6 C74 8 74 12 72 14 Z"
      fill="#DDB892"
      stroke="#B08968"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M64 12 L44 32" stroke="#B08968" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

    {/* Spoon Bowl */}
    <ellipse cx="26" cy="54" rx="22" ry="18" fill="#DDB892" stroke="#B08968" strokeWidth="2.5" />
    <ellipse cx="26" cy="54" rx="19" ry="15" fill="#C59B76" />

    {/* Rich Dark Coffee Granules Pile */}
    <path
      d="M10 52 C10 44 20 40 26 40 C34 40 42 44 42 52 C42 60 34 65 26 65 C18 65 10 60 10 52 Z"
      fill="#4A2810"
    />
    <circle cx="20" cy="48" r="2.5" fill="#361A07" />
    <circle cx="28" cy="46" r="3" fill="#5C3317" />
    <circle cx="34" cy="51" r="2.2" fill="#361A07" />
    <circle cx="23" cy="56" r="2.8" fill="#5C3317" />
    <circle cx="16" cy="53" r="2" fill="#291304" />

    {/* Cute Sparkle */}
    <path d="M26 34 L27 38 L31 39 L27 40 L26 44 L25 40 L21 39 L25 38 Z" fill="#FBBF24" />
  </svg>
);

// 2. Kawaii Sugar Scoop / Bowl
export const SugarScoopIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Pink Handle */}
    <rect x="52" y="36" width="22" height="8" rx="4" fill="#F472B6" stroke="#FB7185" strokeWidth="2" />

    {/* Scoop Body */}
    <path
      d="M12 30 H48 C52 30 54 36 54 44 C54 58 44 68 30 68 C16 68 8 58 8 44 C8 36 10 30 12 30 Z"
      fill="#FFF0F5"
      stroke="#F472B6"
      strokeWidth="2.5"
    />

    {/* Sparkling White Sugar Mound */}
    <ellipse cx="30" cy="42" rx="18" ry="12" fill="#FFFFFF" stroke="#FCE7ED" strokeWidth="1.5" />
    <circle cx="22" cy="42" r="1.5" fill="#F472B6" opacity="0.5" />
    <circle cx="32" cy="38" r="2" fill="#F472B6" opacity="0.4" />
    <circle cx="38" cy="44" r="1.5" fill="#F472B6" opacity="0.5" />

    {/* Cute Smiling Face on Scoop */}
    <circle cx="24" cy="54" r="2" fill="#5D4037" />
    <circle cx="36" cy="54" r="2" fill="#5D4037" />
    <circle cx="20" cy="57" r="2.2" fill="#FB7185" opacity="0.6" />
    <circle cx="40" cy="57" r="2.2" fill="#FB7185" opacity="0.6" />
    <path d="M28 58 Q30 61 32 58" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 3. Kawaii Water Kettle
export const WaterKettleIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Gooseneck Spout */}
    <path
      d="M26 48 C16 48 8 36 8 24 C8 20 12 18 16 20 C18 22 20 28 26 32"
      stroke="#67E8F9"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Water droplet from spout */}
    <path d="M6 14 C6 11 8 8 8 8 C8 8 10 11 10 14 C10 16 9 17 8 17 C7 17 6 16 6 14 Z" fill="#38BDF8" />

    {/* Handle */}
    <path
      d="M58 34 C72 34 74 60 58 64"
      stroke="#F472B6"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />

    {/* Kettle Pot */}
    <path
      d="M26 34 H58 L62 66 C62 70 58 74 54 74 H30 C26 74 22 70 22 66 L26 34 Z"
      fill="#E0F2FE"
      stroke="#7DD3FC"
      strokeWidth="2.5"
    />

    {/* Lid with Round Knob */}
    <ellipse cx="42" cy="34" rx="18" ry="5" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="2" />
    <circle cx="42" cy="27" r="4" fill="#F472B6" stroke="#FB7185" strokeWidth="1.5" />

    {/* Cute Face */}
    <circle cx="36" cy="52" r="2" fill="#0369A1" />
    <circle cx="48" cy="52" r="2" fill="#0369A1" />
    <circle cx="32" cy="55" r="2.2" fill="#F472B6" opacity="0.6" />
    <circle cx="52" cy="55" r="2.2" fill="#F472B6" opacity="0.6" />
    <path d="M40 56 Q42 59 44 56" stroke="#0369A1" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 4. Kawaii Handheld Electric Frother
export const ElectricFrotherIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Handle */}
    <rect x="32" y="6" width="16" height="40" rx="8" fill="#F472B6" stroke="#FB7185" strokeWidth="2.5" />
    {/* Power Button */}
    <circle cx="40" cy="22" r="3.5" fill="#FFFFFF" />
    {/* Cheerful face on handle */}
    <circle cx="37" cy="34" r="1.5" fill="#4A2810" />
    <circle cx="43" cy="34" r="1.5" fill="#4A2810" />
    <path d="M39 37 Q40 39 41 37" stroke="#4A2810" strokeWidth="1" strokeLinecap="round" />

    {/* Metal Shaft */}
    <rect x="38.5" y="46" width="3" height="20" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />

    {/* Whisk Spring Coil */}
    <ellipse cx="40" cy="69" rx="8" ry="4" fill="#E2E8F0" stroke="#64748B" strokeWidth="2.5" />
    <circle cx="40" cy="69" r="3" fill="#94A3B8" />

    {/* Whisk Speed Lines */}
    <path d="M26 68 C28 64 30 64 30 68" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M50 68 C52 72 54 72 54 68" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 5. Kawaii Ice Cube
export const IceCubeIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Ice Cube Block */}
    <rect
      x="16"
      y="18"
      width="48"
      height="48"
      rx="12"
      fill="#E0F2FE"
      stroke="#38BDF8"
      strokeWidth="3"
    />
    {/* Glossy inner facet */}
    <path
      d="M22 24 H54 C56 24 58 26 58 28 V44 L44 32 H22 Z"
      fill="#FFFFFF"
      opacity="0.6"
    />

    {/* Cute Eyes & Smile */}
    <circle cx="34" cy="46" r="3" fill="#0369A1" />
    <circle cx="48" cy="46" r="3" fill="#0369A1" />
    <circle cx="35" cy="45" r="1" fill="#FFFFFF" />
    <circle cx="49" cy="45" r="1" fill="#FFFFFF" />
    {/* Blushing cheeks */}
    <circle cx="28" cy="50" r="3" fill="#F472B6" opacity="0.7" />
    <circle cx="54" cy="50" r="3" fill="#F472B6" opacity="0.7" />
    {/* Sweet open mouth */}
    <path d="M38 52 Q41 57 44 52 Z" fill="#0369A1" />

    {/* Cold Sparkle */}
    <path d="M58 14 L59 18 L63 19 L59 20 L58 24 L57 20 L53 19 L57 18 Z" fill="#38BDF8" />
  </svg>
);

// 6. Kawaii Milk Carton
export const MilkCartonIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Carton Gable Top */}
    <path d="M24 24 L40 10 L56 24 Z" fill="#F472B6" stroke="#FB7185" strokeWidth="2.5" />
    <rect x="36" y="8" width="8" height="6" fill="#FBCFE8" />

    {/* Carton Main Box */}
    <rect x="22" y="24" width="36" height="48" rx="5" fill="#FFFFFF" stroke="#F472B6" strokeWidth="3" />

    {/* Strawberry Milk Diagonal Stripe */}
    <path d="M22 36 H58 V52 H22 Z" fill="#FCE7F3" />
    <text x="40" y="47" textAnchor="middle" fill="#BE185D" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
      MILK
    </text>

    {/* Smiling Cow/Cat Face on Bottom */}
    <circle cx="34" cy="60" r="2" fill="#5D4037" />
    <circle cx="46" cy="60" r="2" fill="#5D4037" />
    <circle cx="30" cy="62" r="2" fill="#F472B6" opacity="0.7" />
    <circle cx="50" cy="62" r="2" fill="#F472B6" opacity="0.7" />
    <path d="M38 63 Q40 65 42 63" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 7. Kawaii Cinnamon Shaker
export const CinnamonShakerIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cap with shaker holes */}
    <rect x="30" y="14" width="20" height="8" rx="3" fill="#D97706" stroke="#B45309" strokeWidth="2" />
    <circle cx="35" cy="18" r="1" fill="#78350F" />
    <circle cx="40" cy="18" r="1" fill="#78350F" />
    <circle cx="45" cy="18" r="1" fill="#78350F" />

    {/* Shaker Glass Jar */}
    <rect x="24" y="22" width="32" height="48" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />

    {/* Cinnamon Spice Level */}
    <rect x="26" y="38" width="28" height="30" rx="4" fill="#B45309" />
    <circle cx="32" cy="44" r="1" fill="#78350F" />
    <circle cx="44" cy="46" r="1.2" fill="#78350F" />
    <circle cx="38" cy="54" r="1" fill="#78350F" />

    {/* Label */}
    <rect x="28" y="26" width="24" height="10" rx="3" fill="#FFFFFF" />
    <text x="40" y="34" textAnchor="middle" fill="#92400E" fontSize="7" fontWeight="bold">
      SPICE
    </text>
  </svg>
);

// 8. Kawaii Vanilla Syrup Bottle
export const VanillaSyrupIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Pump Dispenser */}
    <path d="M40 8 V16 H48 V12 H52 V16" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="36" y="16" width="8" height="6" rx="2" fill="#FBBF24" />

    {/* Bottle Body */}
    <path
      d="M34 22 H46 L50 32 V68 C50 71 47 74 44 74 H36 C33 74 30 71 30 68 V32 L34 22 Z"
      fill="#FFFBEB"
      stroke="#F59E0B"
      strokeWidth="2.5"
    />

    {/* Golden Syrup Liquid */}
    <rect x="32" y="36" width="16" height="36" rx="3" fill="#F59E0B" />

    {/* Cute Label */}
    <rect x="33" y="44" width="14" height="16" rx="2" fill="#FFFFFF" />
    <text x="40" y="55" textAnchor="middle" fill="#B45309" fontSize="6" fontWeight="bold">
      VANILLA
    </text>
  </svg>
);

// 9. Kawaii Ice Cream Scoop
export const IceCreamScoopIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Waffle Cone or Scoop Plate */}
    <path d="M26 48 Q40 68 54 48 Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
    {/* Creamy Scoop */}
    <circle cx="40" cy="38" r="20" fill="#FFFBEB" stroke="#FEF3C7" strokeWidth="2.5" />
    <path d="M22 44 Q30 48 40 46 Q50 48 58 44" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />

    {/* Cute Face */}
    <circle cx="34" cy="36" r="2" fill="#5D4037" />
    <circle cx="46" cy="36" r="2" fill="#5D4037" />
    <circle cx="29" cy="39" r="2" fill="#F472B6" opacity="0.7" />
    <circle cx="51" cy="39" r="2" fill="#F472B6" opacity="0.7" />
    <path d="M38 41 Q40 43 42 41" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />

    {/* Cherry on Top */}
    <circle cx="40" cy="18" r="5" fill="#EF4444" />
    <path d="M40 14 C40 10 44 8 46 8" stroke="#047857" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);
