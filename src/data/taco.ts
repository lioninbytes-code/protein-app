import { Food } from '@/lib/types';

export const TACO_FOODS: Food[] = [
  // === CARNES E AVES ===
  { id: 'taco-frango-peito-grelhado', source: 'taco', category: 'Carnes', name: 'Frango, peito, sem pele, grelhado', proteinPer100g: 31.5, caloriesPer100g: 159, carbsPer100g: 0, fatPer100g: 3.0, servingGrams: 100 },
  { id: 'taco-frango-peito-cozido', source: 'taco', category: 'Carnes', name: 'Frango, peito, sem pele, cozido', proteinPer100g: 32.8, caloriesPer100g: 163, carbsPer100g: 0, fatPer100g: 3.6, servingGrams: 100 },
  { id: 'taco-frango-sobrecoxa', source: 'taco', category: 'Carnes', name: 'Frango, sobrecoxa, sem pele, assada', proteinPer100g: 26.9, caloriesPer100g: 215, carbsPer100g: 0, fatPer100g: 11.2, servingGrams: 100 },
  { id: 'taco-patinho-grelhado', source: 'taco', category: 'Carnes', name: 'Carne bovina, patinho, grelhado', proteinPer100g: 35.9, caloriesPer100g: 219, carbsPer100g: 0, fatPer100g: 7.3, servingGrams: 100 },
  { id: 'taco-alcatra-grelhada', source: 'taco', category: 'Carnes', name: 'Carne bovina, alcatra, grelhada', proteinPer100g: 32.4, caloriesPer100g: 232, carbsPer100g: 0, fatPer100g: 10.4, servingGrams: 100 },
  { id: 'taco-contrafile-grelhado', source: 'taco', category: 'Carnes', name: 'Carne bovina, contrafilé, grelhado', proteinPer100g: 32.9, caloriesPer100g: 263, carbsPer100g: 0, fatPer100g: 14.0, servingGrams: 100 },
  { id: 'taco-musculo-cozido', source: 'taco', category: 'Carnes', name: 'Carne bovina, músculo, cozido', proteinPer100g: 30.7, caloriesPer100g: 219, carbsPer100g: 0, fatPer100g: 10.1, servingGrams: 100 },
  { id: 'taco-lombo-suino', source: 'taco', category: 'Carnes', name: 'Carne suína, lombo, assado', proteinPer100g: 35.7, caloriesPer100g: 211, carbsPer100g: 0, fatPer100g: 7.2, servingGrams: 100 },
  { id: 'taco-hamburguer', source: 'taco', category: 'Carnes', name: 'Hambúrguer bovino, grelhado', proteinPer100g: 19.5, caloriesPer100g: 218, carbsPer100g: 6.0, fatPer100g: 12.6, servingGrams: 80 },
  { id: 'taco-salsicha', source: 'taco', category: 'Embutidos', name: 'Salsicha', proteinPer100g: 11.6, caloriesPer100g: 257, carbsPer100g: 8.6, fatPer100g: 22.6, servingGrams: 50 },
  { id: 'taco-presunto', source: 'taco', category: 'Embutidos', name: 'Presunto magro', proteinPer100g: 18.8, caloriesPer100g: 124, carbsPer100g: 1.6, fatPer100g: 5.0, servingGrams: 30 },

  // === PEIXES ===
  { id: 'taco-tilapia-grelhada', source: 'taco', category: 'Peixes', name: 'Tilápia, filé, grelhado', proteinPer100g: 28.3, caloriesPer100g: 128, carbsPer100g: 0, fatPer100g: 2.7, servingGrams: 100 },
  { id: 'taco-salmao-grelhado', source: 'taco', category: 'Peixes', name: 'Salmão, grelhado', proteinPer100g: 24.5, caloriesPer100g: 224, carbsPer100g: 0, fatPer100g: 14.5, servingGrams: 100 },
  { id: 'taco-atum-conserva', source: 'taco', category: 'Peixes', name: 'Atum em conserva', proteinPer100g: 25.5, caloriesPer100g: 184, carbsPer100g: 0, fatPer100g: 8.2, servingGrams: 80 },
  { id: 'taco-sardinha-conserva', source: 'taco', category: 'Peixes', name: 'Sardinha em conserva', proteinPer100g: 24.2, caloriesPer100g: 207, carbsPer100g: 0, fatPer100g: 11.5, servingGrams: 80 },

  // === OVOS ===
  { id: 'taco-ovo-cozido', source: 'taco', category: 'Ovos', name: 'Ovo de galinha, inteiro, cozido', proteinPer100g: 13.3, caloriesPer100g: 146, carbsPer100g: 0.6, fatPer100g: 9.5, servingGrams: 50 },
  { id: 'taco-ovo-frito', source: 'taco', category: 'Ovos', name: 'Ovo de galinha, inteiro, frito', proteinPer100g: 13.6, caloriesPer100g: 199, carbsPer100g: 0.6, fatPer100g: 16.0, servingGrams: 50 },
  { id: 'taco-clara-cozida', source: 'taco', category: 'Ovos', name: 'Clara de ovo, cozida', proteinPer100g: 10.9, caloriesPer100g: 49, carbsPer100g: 0.7, fatPer100g: 0, servingGrams: 33 },

  // === LATICÍNIOS ===
  { id: 'taco-leite-integral', source: 'taco', category: 'Laticínios', name: 'Leite de vaca integral', proteinPer100g: 3.2, caloriesPer100g: 61, carbsPer100g: 4.6, fatPer100g: 3.3, servingGrams: 200 },
  { id: 'taco-leite-desnatado', source: 'taco', category: 'Laticínios', name: 'Leite de vaca desnatado', proteinPer100g: 3.1, caloriesPer100g: 35, carbsPer100g: 4.7, fatPer100g: 0.1, servingGrams: 200 },
  { id: 'taco-iogurte-natural', source: 'taco', category: 'Laticínios', name: 'Iogurte natural integral', proteinPer100g: 4.1, caloriesPer100g: 51, carbsPer100g: 1.9, fatPer100g: 3.0, servingGrams: 170 },
  { id: 'taco-iogurte-grego', source: 'taco', category: 'Laticínios', name: 'Iogurte grego natural', proteinPer100g: 8.5, caloriesPer100g: 96, carbsPer100g: 4.0, fatPer100g: 4.0, servingGrams: 100 },
  { id: 'taco-queijo-mussarela', source: 'taco', category: 'Laticínios', name: 'Queijo mussarela', proteinPer100g: 22.6, caloriesPer100g: 330, carbsPer100g: 3.0, fatPer100g: 25.0, servingGrams: 30 },
  { id: 'taco-queijo-prato', source: 'taco', category: 'Laticínios', name: 'Queijo prato', proteinPer100g: 22.7, caloriesPer100g: 360, carbsPer100g: 1.9, fatPer100g: 29.1, servingGrams: 30 },
  { id: 'taco-queijo-parmesao', source: 'taco', category: 'Laticínios', name: 'Queijo parmesão', proteinPer100g: 35.7, caloriesPer100g: 453, carbsPer100g: 3.1, fatPer100g: 32.7, servingGrams: 15 },
  { id: 'taco-ricota', source: 'taco', category: 'Laticínios', name: 'Ricota', proteinPer100g: 11.0, caloriesPer100g: 140, carbsPer100g: 4.2, fatPer100g: 8.7, servingGrams: 50 },
  { id: 'taco-cottage', source: 'taco', category: 'Laticínios', name: 'Queijo cottage', proteinPer100g: 13.8, caloriesPer100g: 88, carbsPer100g: 2.6, fatPer100g: 3.2, servingGrams: 100 },
  { id: 'taco-minas-frescal', source: 'taco', category: 'Laticínios', name: 'Queijo minas frescal', proteinPer100g: 17.4, caloriesPer100g: 264, carbsPer100g: 3.2, fatPer100g: 20.2, servingGrams: 30 },
  { id: 'taco-requeijao', source: 'taco', category: 'Laticínios', name: 'Requeijão cremoso', proteinPer100g: 9.6, caloriesPer100g: 257, carbsPer100g: 3.0, fatPer100g: 23.0, servingGrams: 30 },

  // === LEGUMINOSAS ===
  { id: 'taco-feijao-preto', source: 'taco', category: 'Leguminosas', name: 'Feijão preto cozido', proteinPer100g: 4.5, caloriesPer100g: 77, carbsPer100g: 14.0, fatPer100g: 0.5, servingGrams: 80 },
  { id: 'taco-feijao-carioca', source: 'taco', category: 'Leguminosas', name: 'Feijão carioca cozido', proteinPer100g: 4.8, caloriesPer100g: 76, carbsPer100g: 13.6, fatPer100g: 0.5, servingGrams: 80 },
  { id: 'taco-lentilha', source: 'taco', category: 'Leguminosas', name: 'Lentilha cozida', proteinPer100g: 6.3, caloriesPer100g: 93, carbsPer100g: 16.3, fatPer100g: 0.5, servingGrams: 80 },
  { id: 'taco-grao-de-bico', source: 'taco', category: 'Leguminosas', name: 'Grão-de-bico cozido', proteinPer100g: 8.9, caloriesPer100g: 121, carbsPer100g: 19.7, fatPer100g: 2.0, servingGrams: 80 },
  { id: 'taco-soja-cozida', source: 'taco', category: 'Leguminosas', name: 'Soja cozida', proteinPer100g: 15.7, caloriesPer100g: 152, carbsPer100g: 6.3, fatPer100g: 8.0, servingGrams: 80 },
  { id: 'taco-tofu', source: 'taco', category: 'Leguminosas', name: 'Tofu', proteinPer100g: 6.6, caloriesPer100g: 64, carbsPer100g: 2.3, fatPer100g: 4.2, servingGrams: 80 },

  // === GRÃOS E CEREAIS ===
  { id: 'taco-arroz-branco', source: 'taco', category: 'Grãos', name: 'Arroz branco cozido', proteinPer100g: 2.5, caloriesPer100g: 128, carbsPer100g: 28.1, fatPer100g: 0.2, servingGrams: 100 },
  { id: 'taco-arroz-integral', source: 'taco', category: 'Grãos', name: 'Arroz integral cozido', proteinPer100g: 2.6, caloriesPer100g: 124, carbsPer100g: 25.8, fatPer100g: 1.0, servingGrams: 100 },
  { id: 'taco-aveia-flocos', source: 'taco', category: 'Grãos', name: 'Aveia em flocos crua', proteinPer100g: 13.9, caloriesPer100g: 394, carbsPer100g: 66.6, fatPer100g: 8.5, servingGrams: 30 },
  { id: 'taco-quinoa', source: 'taco', category: 'Grãos', name: 'Quinoa cozida', proteinPer100g: 4.4, caloriesPer100g: 120, carbsPer100g: 21.3, fatPer100g: 1.9, servingGrams: 80 },
  { id: 'taco-pao-frances', source: 'taco', category: 'Pães', name: 'Pão francês', proteinPer100g: 8.0, caloriesPer100g: 300, carbsPer100g: 58.6, fatPer100g: 3.1, servingGrams: 50 },
  { id: 'taco-pao-integral', source: 'taco', category: 'Pães', name: 'Pão integral', proteinPer100g: 9.4, caloriesPer100g: 253, carbsPer100g: 49.9, fatPer100g: 3.7, servingGrams: 50 },
  { id: 'taco-pao-forma', source: 'taco', category: 'Pães', name: 'Pão de forma branco', proteinPer100g: 9.4, caloriesPer100g: 269, carbsPer100g: 49.9, fatPer100g: 3.1, servingGrams: 25 },
  { id: 'taco-macarrao', source: 'taco', category: 'Massas', name: 'Macarrão cozido', proteinPer100g: 5.8, caloriesPer100g: 102, carbsPer100g: 19.9, fatPer100g: 0.9, servingGrams: 100 },
  { id: 'taco-batata-inglesa', source: 'taco', category: 'Tubérculos', name: 'Batata inglesa cozida', proteinPer100g: 1.2, caloriesPer100g: 52, carbsPer100g: 11.9, fatPer100g: 0, servingGrams: 150 },
  { id: 'taco-batata-doce', source: 'taco', category: 'Tubérculos', name: 'Batata doce cozida', proteinPer100g: 1.3, caloriesPer100g: 77, carbsPer100g: 18.4, fatPer100g: 0.1, servingGrams: 150 },
  { id: 'taco-mandioca', source: 'taco', category: 'Tubérculos', name: 'Mandioca cozida', proteinPer100g: 0.6, caloriesPer100g: 125, carbsPer100g: 30.1, fatPer100g: 0.3, servingGrams: 100 },

  // === SUPLEMENTOS ===
  { id: 'sup-whey-concentrado', source: 'taco', category: 'Suplementos', name: 'Whey protein concentrado (genérico)', proteinPer100g: 80, caloriesPer100g: 372, carbsPer100g: 9, fatPer100g: 4, servingGrams: 30 },
  { id: 'sup-whey-isolado', source: 'taco', category: 'Suplementos', name: 'Whey protein isolado (genérico)', proteinPer100g: 90, caloriesPer100g: 360, carbsPer100g: 0, fatPer100g: 0, servingGrams: 30 },
  { id: 'sup-caseina', source: 'taco', category: 'Suplementos', name: 'Caseína (genérica)', proteinPer100g: 80, caloriesPer100g: 360, carbsPer100g: 5, fatPer100g: 1, servingGrams: 30 },
  { id: 'sup-albumina', source: 'taco', category: 'Suplementos', name: 'Albumina (genérica)', proteinPer100g: 75, caloriesPer100g: 360, carbsPer100g: 6, fatPer100g: 0, servingGrams: 30 },

  // === FRUTAS ===
  { id: 'taco-banana', source: 'taco', category: 'Frutas', name: 'Banana nanica', proteinPer100g: 1.4, caloriesPer100g: 92, carbsPer100g: 23.8, fatPer100g: 0.1, servingGrams: 100 },
  { id: 'taco-maca', source: 'taco', category: 'Frutas', name: 'Maçã, com casca', proteinPer100g: 0.3, caloriesPer100g: 56, carbsPer100g: 15.2, fatPer100g: 0, servingGrams: 130 },
  { id: 'taco-mamao', source: 'taco', category: 'Frutas', name: 'Mamão papaya', proteinPer100g: 0.5, caloriesPer100g: 40, carbsPer100g: 10.4, fatPer100g: 0.1, servingGrams: 150 },
  { id: 'taco-laranja', source: 'taco', category: 'Frutas', name: 'Laranja pera', proteinPer100g: 1.0, caloriesPer100g: 37, carbsPer100g: 8.9, fatPer100g: 0.1, servingGrams: 130 },
  { id: 'taco-abacate', source: 'taco', category: 'Frutas', name: 'Abacate', proteinPer100g: 1.2, caloriesPer100g: 96, carbsPer100g: 6.0, fatPer100g: 8.4, servingGrams: 100 },
  { id: 'taco-morango', source: 'taco', category: 'Frutas', name: 'Morango', proteinPer100g: 0.9, caloriesPer100g: 30, carbsPer100g: 6.8, fatPer100g: 0.3, servingGrams: 100 },

  // === VERDURAS ===
  { id: 'taco-brocolis', source: 'taco', category: 'Verduras', name: 'Brócolis cozido', proteinPer100g: 2.1, caloriesPer100g: 25, carbsPer100g: 4.4, fatPer100g: 0.4, servingGrams: 80 },
  { id: 'taco-couve', source: 'taco', category: 'Verduras', name: 'Couve manteiga cozida', proteinPer100g: 2.9, caloriesPer100g: 25, carbsPer100g: 4.3, fatPer100g: 0.4, servingGrams: 60 },
  { id: 'taco-espinafre', source: 'taco', category: 'Verduras', name: 'Espinafre cozido', proteinPer100g: 1.7, caloriesPer100g: 22, carbsPer100g: 3.6, fatPer100g: 0.4, servingGrams: 60 },
  { id: 'taco-alface', source: 'taco', category: 'Verduras', name: 'Alface lisa crua', proteinPer100g: 1.4, caloriesPer100g: 11, carbsPer100g: 1.7, fatPer100g: 0.2, servingGrams: 30 },
  { id: 'taco-tomate', source: 'taco', category: 'Verduras', name: 'Tomate cru com casca', proteinPer100g: 1.1, caloriesPer100g: 15, carbsPer100g: 3.1, fatPer100g: 0.2, servingGrams: 80 },

  // === OLEAGINOSAS ===
  { id: 'taco-pasta-amendoim', source: 'taco', category: 'Oleaginosas', name: 'Pasta de amendoim', proteinPer100g: 24.3, caloriesPer100g: 588, carbsPer100g: 19.2, fatPer100g: 47.7, servingGrams: 15 },
  { id: 'taco-amendoim', source: 'taco', category: 'Oleaginosas', name: 'Amendoim torrado', proteinPer100g: 25.3, caloriesPer100g: 552, carbsPer100g: 20.3, fatPer100g: 43.9, servingGrams: 25 },
  { id: 'taco-castanha-para', source: 'taco', category: 'Oleaginosas', name: 'Castanha do Pará', proteinPer100g: 14.5, caloriesPer100g: 643, carbsPer100g: 15.1, fatPer100g: 63.5, servingGrams: 15 },
];
