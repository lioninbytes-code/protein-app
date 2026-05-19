import { TACO_FOODS } from '@/data/taco';
import { Food } from './types';

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function searchFoods(query: string, allFoods: Food[] = TACO_FOODS, limit = 20): Food[] {
  const q = normalize(query);
  if (!q) return [];
  const terms = q.split(' ').filter(Boolean);

  type Scored = { food: Food; score: number };
  const scored: Scored[] = [];

  for (const food of allFoods) {
    const name = normalize(food.name);
    let score = 0;
    let allTermsMatch = true;
    for (const t of terms) {
      if (name === t) score += 1000;
      else if (name.startsWith(t)) score += 200;
      else if (name.includes(' ' + t)) score += 100;
      else if (name.includes(t)) score += 50;
      else {
        allTermsMatch = false;
        break;
      }
    }
    if (allTermsMatch) {
      score += food.proteinPer100g * 0.5;
      scored.push({ food, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.food);
}

export function bestProteinPerCalorie(limit = 15): Food[] {
  return [...TACO_FOODS]
    .filter((f) => f.caloriesPer100g > 20 && f.proteinPer100g > 5)
    .sort((a, b) => (b.proteinPer100g / b.caloriesPer100g) - (a.proteinPer100g / a.caloriesPer100g))
    .slice(0, limit);
}

export function findById(id: string): Food | undefined {
  return TACO_FOODS.find((f) => f.id === id);
}

export function categories(): string[] {
  return Array.from(new Set(TACO_FOODS.map((f) => f.category).filter(Boolean) as string[]));
}
