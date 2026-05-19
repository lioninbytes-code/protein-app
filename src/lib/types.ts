export type FoodSource = 'taco' | 'barcode' | 'photo' | 'custom';

export type Food = {
  id: string;
  source: FoodSource;
  name: string;
  brand?: string;
  category?: string;
  proteinPer100g: number;
  caloriesPer100g: number;
  carbsPer100g?: number;
  fatPer100g?: number;
  servingGrams?: number;
};

export type Entry = {
  id: string;
  foodId: string;
  foodSnapshot: Food;
  grams: number;
  date: string;
  time: string;
  proteinG: number;
  kcal: number;
};

export type ApiSpendEntry = {
  date: string;
  cents: number;
  kind: 'photo';
};

export type AppData = {
  proteinGoalG: number;
  weightKg?: number;
  entries: Entry[];
  customFoods: Food[];
  apiSpend: {
    capCents: number;
    totalCents: number;
    log: ApiSpendEntry[];
  };
  prefs: {
    photoEnabled: boolean;
    suggestionsEnabled: boolean;
  };
  onboardingComplete: boolean;
};

export const DEFAULT_DATA: AppData = {
  proteinGoalG: 120,
  entries: [],
  customFoods: [],
  apiSpend: {
    capCents: 500,
    totalCents: 0,
    log: [],
  },
  prefs: {
    photoEnabled: true,
    suggestionsEnabled: true,
  },
  onboardingComplete: false,
};
