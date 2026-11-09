/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppStage =
  | 'PRELOADER'
  | 'INTRO'
  | 'INGREDIENTS'
  | 'BREW_BASE'
  | 'FROTHING'
  | 'BUILD_DRINK'
  | 'READY';

export interface IngredientItem {
  id: string;
  name: string;
  hindiName?: string;
  icon: string;
  isOptional: boolean;
  description: string;
  selected: boolean;
}

export type BaseStep = 'coffee' | 'sugar' | 'water' | 'done';

export type BuildStep =
  | 'ice'
  | 'shake'
  | 'optional_water'
  | 'milk'
  | 'toppings'
  | 'swirl'
  | 'done';

export interface CoffeeState {
  coffeeAdded: boolean;
  sugarAdded: boolean;
  baseWaterAdded: boolean;
  frothProgress: number; // 0 to 100
  iceCubesCount: number;
  isShaken: boolean;
  optionalWaterAdded: boolean;
  milkAdded: boolean;
  cinnamonSprinkled: boolean;
  vanillaDrizzled: boolean;
  iceCreamAdded: boolean;
  swirled: boolean;
  customerName?: string;
}
