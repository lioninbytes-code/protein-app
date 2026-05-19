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

  // === OVOS (extras) ===
  { id: 'taco-ovo-mexido', source: 'taco', category: 'Ovos', name: 'Ovo de galinha, mexido', proteinPer100g: 13.1, caloriesPer100g: 197, carbsPer100g: 1.6, fatPer100g: 15.3, servingGrams: 60 },
  { id: 'taco-omelete', source: 'taco', category: 'Ovos', name: 'Omelete simples (2 ovos)', proteinPer100g: 13.0, caloriesPer100g: 184, carbsPer100g: 1.0, fatPer100g: 14.0, servingGrams: 120 },
  { id: 'taco-ovo-poche', source: 'taco', category: 'Ovos', name: 'Ovo de galinha, poché', proteinPer100g: 12.5, caloriesPer100g: 143, carbsPer100g: 0.7, fatPer100g: 9.4, servingGrams: 50 },

  // === BATATAS (extras) ===
  { id: 'taco-batata-frita', source: 'taco', category: 'Tubérculos', name: 'Batata frita (palito)', proteinPer100g: 4.0, caloriesPer100g: 270, carbsPer100g: 35.7, fatPer100g: 13.6, servingGrams: 150 },
  { id: 'taco-batata-frita-fastfood', source: 'taco', category: 'Tubérculos', name: 'Batata frita estilo fast food', proteinPer100g: 3.4, caloriesPer100g: 312, carbsPer100g: 41.0, fatPer100g: 15.0, servingGrams: 110 },
  { id: 'taco-batata-chips', source: 'taco', category: 'Snacks', name: 'Batata chips (pacote)', proteinPer100g: 6.6, caloriesPer100g: 543, carbsPer100g: 53.0, fatPer100g: 34.0, servingGrams: 30 },
  { id: 'taco-pure-batata', source: 'taco', category: 'Tubérculos', name: 'Purê de batata', proteinPer100g: 2.0, caloriesPer100g: 110, carbsPer100g: 16.0, fatPer100g: 4.5, servingGrams: 150 },

  // === CARNES (extras) ===
  { id: 'taco-picanha', source: 'taco', category: 'Carnes', name: 'Picanha bovina, grelhada', proteinPer100g: 26.7, caloriesPer100g: 286, carbsPer100g: 0, fatPer100g: 19.7, servingGrams: 150 },
  { id: 'taco-coxao-mole', source: 'taco', category: 'Carnes', name: 'Coxão mole, grelhado', proteinPer100g: 32.5, caloriesPer100g: 215, carbsPer100g: 0, fatPer100g: 8.7, servingGrams: 100 },
  { id: 'taco-bife-milanesa', source: 'taco', category: 'Carnes', name: 'Bife à milanesa', proteinPer100g: 23.5, caloriesPer100g: 296, carbsPer100g: 11.0, fatPer100g: 17.5, servingGrams: 100 },
  { id: 'taco-carne-moida', source: 'taco', category: 'Carnes', name: 'Carne moída, refogada', proteinPer100g: 23.5, caloriesPer100g: 213, carbsPer100g: 1.4, fatPer100g: 13.0, servingGrams: 100 },
  { id: 'taco-costela-bovina', source: 'taco', category: 'Carnes', name: 'Costela bovina, assada', proteinPer100g: 26.5, caloriesPer100g: 373, carbsPer100g: 0, fatPer100g: 29.6, servingGrams: 150 },
  { id: 'taco-fraldinha', source: 'taco', category: 'Carnes', name: 'Fraldinha grelhada', proteinPer100g: 27.4, caloriesPer100g: 257, carbsPer100g: 0, fatPer100g: 15.9, servingGrams: 150 },
  { id: 'taco-strogonoff-carne', source: 'taco', category: 'Carnes', name: 'Estrogonofe de carne', proteinPer100g: 13.5, caloriesPer100g: 197, carbsPer100g: 6.0, fatPer100g: 14.0, servingGrams: 150 },
  { id: 'taco-linguica-calabresa', source: 'taco', category: 'Embutidos', name: 'Linguiça calabresa, grelhada', proteinPer100g: 18.6, caloriesPer100g: 322, carbsPer100g: 1.5, fatPer100g: 27.7, servingGrams: 60 },
  { id: 'taco-linguica-toscana', source: 'taco', category: 'Embutidos', name: 'Linguiça toscana, grelhada', proteinPer100g: 16.0, caloriesPer100g: 297, carbsPer100g: 1.8, fatPer100g: 25.9, servingGrams: 60 },
  { id: 'taco-bacon', source: 'taco', category: 'Embutidos', name: 'Bacon, fatia frita', proteinPer100g: 27.0, caloriesPer100g: 541, carbsPer100g: 1.4, fatPer100g: 47.6, servingGrams: 30 },
  { id: 'taco-mortadela', source: 'taco', category: 'Embutidos', name: 'Mortadela', proteinPer100g: 12.4, caloriesPer100g: 269, carbsPer100g: 2.7, fatPer100g: 23.1, servingGrams: 30 },
  { id: 'taco-peito-peru', source: 'taco', category: 'Embutidos', name: 'Peito de peru defumado', proteinPer100g: 18.7, caloriesPer100g: 101, carbsPer100g: 2.0, fatPer100g: 1.6, servingGrams: 30 },
  { id: 'taco-bisteca-suina', source: 'taco', category: 'Carnes', name: 'Bisteca suína, grelhada', proteinPer100g: 30.0, caloriesPer100g: 251, carbsPer100g: 0, fatPer100g: 14.2, servingGrams: 100 },
  { id: 'taco-pernil-suino', source: 'taco', category: 'Carnes', name: 'Pernil suíno, assado', proteinPer100g: 31.2, caloriesPer100g: 250, carbsPer100g: 0, fatPer100g: 13.5, servingGrams: 100 },

  // === FRANGO (extras) ===
  { id: 'taco-coxa-frango', source: 'taco', category: 'Carnes', name: 'Coxa de frango, sem pele, assada', proteinPer100g: 27.1, caloriesPer100g: 178, carbsPer100g: 0, fatPer100g: 7.7, servingGrams: 100 },
  { id: 'taco-asa-frango', source: 'taco', category: 'Carnes', name: 'Asa de frango, com pele, assada', proteinPer100g: 25.0, caloriesPer100g: 257, carbsPer100g: 0, fatPer100g: 17.5, servingGrams: 80 },
  { id: 'taco-frango-milanesa', source: 'taco', category: 'Carnes', name: 'Frango à milanesa', proteinPer100g: 22.7, caloriesPer100g: 240, carbsPer100g: 10.0, fatPer100g: 11.0, servingGrams: 120 },
  { id: 'taco-nuggets', source: 'taco', category: 'Carnes', name: 'Nuggets de frango', proteinPer100g: 14.0, caloriesPer100g: 270, carbsPer100g: 18.0, fatPer100g: 16.0, servingGrams: 80 },
  { id: 'taco-frango-passarinho', source: 'taco', category: 'Carnes', name: 'Frango a passarinho (frito)', proteinPer100g: 25.0, caloriesPer100g: 312, carbsPer100g: 3.0, fatPer100g: 22.0, servingGrams: 100 },

  // === PEIXES E FRUTOS DO MAR (extras) ===
  { id: 'taco-bacalhau', source: 'taco', category: 'Peixes', name: 'Bacalhau dessalgado, cozido', proteinPer100g: 26.7, caloriesPer100g: 138, carbsPer100g: 0, fatPer100g: 3.5, servingGrams: 100 },
  { id: 'taco-merluza', source: 'taco', category: 'Peixes', name: 'Merluza, filé, grelhado', proteinPer100g: 23.2, caloriesPer100g: 109, carbsPer100g: 0, fatPer100g: 1.0, servingGrams: 100 },
  { id: 'taco-pescada', source: 'taco', category: 'Peixes', name: 'Pescada branca, grelhada', proteinPer100g: 23.8, caloriesPer100g: 116, carbsPer100g: 0, fatPer100g: 1.7, servingGrams: 100 },
  { id: 'taco-camarao-cozido', source: 'taco', category: 'Peixes', name: 'Camarão cozido', proteinPer100g: 24.0, caloriesPer100g: 99, carbsPer100g: 0.2, fatPer100g: 0.3, servingGrams: 100 },
  { id: 'taco-polvo', source: 'taco', category: 'Peixes', name: 'Polvo cozido', proteinPer100g: 25.4, caloriesPer100g: 139, carbsPer100g: 3.7, fatPer100g: 1.8, servingGrams: 100 },
  { id: 'taco-lula', source: 'taco', category: 'Peixes', name: 'Lula cozida', proteinPer100g: 17.9, caloriesPer100g: 92, carbsPer100g: 3.1, fatPer100g: 1.4, servingGrams: 100 },

  // === LATICÍNIOS (extras) ===
  { id: 'taco-queijo-minas-padrao', source: 'taco', category: 'Laticínios', name: 'Queijo minas padrão', proteinPer100g: 25.9, caloriesPer100g: 321, carbsPer100g: 1.6, fatPer100g: 25.0, servingGrams: 30 },
  { id: 'taco-gorgonzola', source: 'taco', category: 'Laticínios', name: 'Queijo gorgonzola', proteinPer100g: 21.4, caloriesPer100g: 353, carbsPer100g: 2.3, fatPer100g: 28.7, servingGrams: 30 },
  { id: 'taco-gouda', source: 'taco', category: 'Laticínios', name: 'Queijo gouda', proteinPer100g: 24.9, caloriesPer100g: 356, carbsPer100g: 2.2, fatPer100g: 27.4, servingGrams: 30 },
  { id: 'taco-provolone', source: 'taco', category: 'Laticínios', name: 'Queijo provolone', proteinPer100g: 25.6, caloriesPer100g: 351, carbsPer100g: 2.1, fatPer100g: 26.6, servingGrams: 30 },
  { id: 'taco-coalho', source: 'taco', category: 'Laticínios', name: 'Queijo coalho, assado', proteinPer100g: 23.5, caloriesPer100g: 295, carbsPer100g: 1.6, fatPer100g: 22.0, servingGrams: 60 },
  { id: 'taco-manteiga', source: 'taco', category: 'Laticínios', name: 'Manteiga sem sal', proteinPer100g: 0.9, caloriesPer100g: 717, carbsPer100g: 0.1, fatPer100g: 81.1, servingGrams: 10 },
  { id: 'taco-iogurte-morango', source: 'taco', category: 'Laticínios', name: 'Iogurte de morango (industrializado)', proteinPer100g: 3.5, caloriesPer100g: 89, carbsPer100g: 14.5, fatPer100g: 2.0, servingGrams: 170 },
  { id: 'taco-leite-condensado', source: 'taco', category: 'Laticínios', name: 'Leite condensado', proteinPer100g: 7.5, caloriesPer100g: 325, carbsPer100g: 55.0, fatPer100g: 8.3, servingGrams: 20 },
  { id: 'taco-creme-leite', source: 'taco', category: 'Laticínios', name: 'Creme de leite (caixinha)', proteinPer100g: 2.1, caloriesPer100g: 195, carbsPer100g: 3.5, fatPer100g: 20.0, servingGrams: 30 },

  // === GRÃOS E MASSAS (extras) ===
  { id: 'taco-cuscuz-nordestino', source: 'taco', category: 'Grãos', name: 'Cuscuz nordestino (milho)', proteinPer100g: 2.2, caloriesPer100g: 113, carbsPer100g: 25.4, fatPer100g: 0.3, servingGrams: 100 },
  { id: 'taco-cuscuz-paulista', source: 'taco', category: 'Grãos', name: 'Cuscuz paulista', proteinPer100g: 3.4, caloriesPer100g: 130, carbsPer100g: 23.0, fatPer100g: 3.0, servingGrams: 100 },
  { id: 'taco-milho-cozido', source: 'taco', category: 'Grãos', name: 'Milho verde cozido', proteinPer100g: 3.3, caloriesPer100g: 98, carbsPer100g: 21.8, fatPer100g: 0.6, servingGrams: 100 },
  { id: 'taco-polenta', source: 'taco', category: 'Grãos', name: 'Polenta cozida', proteinPer100g: 1.0, caloriesPer100g: 71, carbsPer100g: 15.0, fatPer100g: 0.3, servingGrams: 150 },
  { id: 'taco-tapioca', source: 'taco', category: 'Pães', name: 'Tapioca (massa pronta)', proteinPer100g: 0.5, caloriesPer100g: 350, carbsPer100g: 87.0, fatPer100g: 0.2, servingGrams: 50 },
  { id: 'taco-pao-de-queijo', source: 'taco', category: 'Pães', name: 'Pão de queijo', proteinPer100g: 5.9, caloriesPer100g: 363, carbsPer100g: 41.7, fatPer100g: 18.0, servingGrams: 25 },
  { id: 'taco-granola', source: 'taco', category: 'Grãos', name: 'Granola sem adição de açúcar', proteinPer100g: 11.5, caloriesPer100g: 430, carbsPer100g: 64.0, fatPer100g: 14.0, servingGrams: 40 },
  { id: 'taco-sucrilhos', source: 'taco', category: 'Grãos', name: 'Sucrilhos (cereal de milho)', proteinPer100g: 7.5, caloriesPer100g: 376, carbsPer100g: 84.0, fatPer100g: 0.9, servingGrams: 30 },
  { id: 'taco-farofa', source: 'taco', category: 'Grãos', name: 'Farofa pronta', proteinPer100g: 2.5, caloriesPer100g: 410, carbsPer100g: 72.0, fatPer100g: 12.0, servingGrams: 30 },

  // === FRUTAS (extras) ===
  { id: 'taco-abacaxi', source: 'taco', category: 'Frutas', name: 'Abacaxi', proteinPer100g: 0.9, caloriesPer100g: 48, carbsPer100g: 12.3, fatPer100g: 0.1, servingGrams: 100 },
  { id: 'taco-manga', source: 'taco', category: 'Frutas', name: 'Manga, palmer', proteinPer100g: 0.4, caloriesPer100g: 64, carbsPer100g: 16.4, fatPer100g: 0.2, servingGrams: 100 },
  { id: 'taco-melancia', source: 'taco', category: 'Frutas', name: 'Melancia', proteinPer100g: 0.9, caloriesPer100g: 33, carbsPer100g: 8.1, fatPer100g: 0.2, servingGrams: 150 },
  { id: 'taco-melao', source: 'taco', category: 'Frutas', name: 'Melão', proteinPer100g: 0.7, caloriesPer100g: 29, carbsPer100g: 7.5, fatPer100g: 0.1, servingGrams: 150 },
  { id: 'taco-uva', source: 'taco', category: 'Frutas', name: 'Uva itália', proteinPer100g: 0.7, caloriesPer100g: 53, carbsPer100g: 13.6, fatPer100g: 0.2, servingGrams: 100 },
  { id: 'taco-pera', source: 'taco', category: 'Frutas', name: 'Pera', proteinPer100g: 0.3, caloriesPer100g: 53, carbsPer100g: 14.0, fatPer100g: 0.1, servingGrams: 130 },
  { id: 'taco-kiwi', source: 'taco', category: 'Frutas', name: 'Kiwi', proteinPer100g: 1.1, caloriesPer100g: 61, carbsPer100g: 14.7, fatPer100g: 0.5, servingGrams: 75 },
  { id: 'taco-pessego', source: 'taco', category: 'Frutas', name: 'Pêssego', proteinPer100g: 0.8, caloriesPer100g: 36, carbsPer100g: 9.8, fatPer100g: 0.1, servingGrams: 100 },
  { id: 'taco-goiaba', source: 'taco', category: 'Frutas', name: 'Goiaba branca', proteinPer100g: 0.9, caloriesPer100g: 52, carbsPer100g: 13.7, fatPer100g: 0.5, servingGrams: 100 },
  { id: 'taco-coco-fresco', source: 'taco', category: 'Frutas', name: 'Coco fresco (polpa)', proteinPer100g: 2.9, caloriesPer100g: 406, carbsPer100g: 10.4, fatPer100g: 42.0, servingGrams: 30 },
  { id: 'taco-uva-passa', source: 'taco', category: 'Frutas', name: 'Uva passa', proteinPer100g: 2.9, caloriesPer100g: 280, carbsPer100g: 76.0, fatPer100g: 0.5, servingGrams: 30 },

  // === VERDURAS/LEGUMES (extras) ===
  { id: 'taco-cenoura-cozida', source: 'taco', category: 'Verduras', name: 'Cenoura cozida', proteinPer100g: 0.8, caloriesPer100g: 30, carbsPer100g: 6.7, fatPer100g: 0.2, servingGrams: 80 },
  { id: 'taco-beterraba-cozida', source: 'taco', category: 'Verduras', name: 'Beterraba cozida', proteinPer100g: 1.3, caloriesPer100g: 32, carbsPer100g: 7.2, fatPer100g: 0.1, servingGrams: 80 },
  { id: 'taco-abobrinha', source: 'taco', category: 'Verduras', name: 'Abobrinha cozida', proteinPer100g: 1.0, caloriesPer100g: 15, carbsPer100g: 3.0, fatPer100g: 0.1, servingGrams: 100 },
  { id: 'taco-berinjela', source: 'taco', category: 'Verduras', name: 'Berinjela cozida', proteinPer100g: 0.9, caloriesPer100g: 19, carbsPer100g: 4.6, fatPer100g: 0.1, servingGrams: 100 },
  { id: 'taco-pimentao', source: 'taco', category: 'Verduras', name: 'Pimentão verde cru', proteinPer100g: 0.9, caloriesPer100g: 21, carbsPer100g: 4.9, fatPer100g: 0.2, servingGrams: 60 },
  { id: 'taco-cebola', source: 'taco', category: 'Verduras', name: 'Cebola crua', proteinPer100g: 1.7, caloriesPer100g: 39, carbsPer100g: 8.9, fatPer100g: 0.2, servingGrams: 30 },
  { id: 'taco-pepino', source: 'taco', category: 'Verduras', name: 'Pepino cru', proteinPer100g: 0.9, caloriesPer100g: 10, carbsPer100g: 2.0, fatPer100g: 0.1, servingGrams: 80 },
  { id: 'taco-repolho', source: 'taco', category: 'Verduras', name: 'Repolho cru', proteinPer100g: 1.4, caloriesPer100g: 22, carbsPer100g: 5.4, fatPer100g: 0.1, servingGrams: 60 },
  { id: 'taco-abobora', source: 'taco', category: 'Verduras', name: 'Abóbora cozida', proteinPer100g: 1.1, caloriesPer100g: 24, carbsPer100g: 5.7, fatPer100g: 0.1, servingGrams: 100 },
  { id: 'taco-chuchu', source: 'taco', category: 'Verduras', name: 'Chuchu cozido', proteinPer100g: 0.4, caloriesPer100g: 17, carbsPer100g: 4.1, fatPer100g: 0.1, servingGrams: 100 },
  { id: 'taco-vagem', source: 'taco', category: 'Verduras', name: 'Vagem cozida', proteinPer100g: 1.7, caloriesPer100g: 28, carbsPer100g: 6.3, fatPer100g: 0.2, servingGrams: 80 },
  { id: 'taco-quiabo', source: 'taco', category: 'Verduras', name: 'Quiabo cozido', proteinPer100g: 1.9, caloriesPer100g: 31, carbsPer100g: 7.0, fatPer100g: 0.2, servingGrams: 80 },
  { id: 'taco-rucula', source: 'taco', category: 'Verduras', name: 'Rúcula crua', proteinPer100g: 2.6, caloriesPer100g: 23, carbsPer100g: 3.7, fatPer100g: 0.5, servingGrams: 30 },

  // === PRATOS PRONTOS ===
  { id: 'taco-pizza-mussarela', source: 'taco', category: 'Pratos', name: 'Pizza muçarela (fatia)', proteinPer100g: 10.8, caloriesPer100g: 235, carbsPer100g: 27.5, fatPer100g: 8.8, servingGrams: 130 },
  { id: 'taco-pizza-calabresa', source: 'taco', category: 'Pratos', name: 'Pizza calabresa (fatia)', proteinPer100g: 11.5, caloriesPer100g: 268, carbsPer100g: 26.0, fatPer100g: 12.5, servingGrams: 130 },
  { id: 'taco-coxinha', source: 'taco', category: 'Pratos', name: 'Coxinha de frango (1 unidade)', proteinPer100g: 7.2, caloriesPer100g: 282, carbsPer100g: 27.0, fatPer100g: 16.0, servingGrams: 80 },
  { id: 'taco-pastel-carne', source: 'taco', category: 'Pratos', name: 'Pastel de carne frito', proteinPer100g: 9.0, caloriesPer100g: 313, carbsPer100g: 30.0, fatPer100g: 17.0, servingGrams: 80 },
  { id: 'taco-esfiha-carne', source: 'taco', category: 'Pratos', name: 'Esfiha de carne aberta', proteinPer100g: 11.0, caloriesPer100g: 240, carbsPer100g: 31.0, fatPer100g: 8.0, servingGrams: 80 },
  { id: 'taco-feijoada', source: 'taco', category: 'Pratos', name: 'Feijoada completa', proteinPer100g: 8.5, caloriesPer100g: 142, carbsPer100g: 12.4, fatPer100g: 6.4, servingGrams: 200 },
  { id: 'taco-lasanha-bolonhesa', source: 'taco', category: 'Pratos', name: 'Lasanha à bolonhesa', proteinPer100g: 9.8, caloriesPer100g: 162, carbsPer100g: 16.0, fatPer100g: 6.8, servingGrams: 200 },
  { id: 'taco-strogonoff-frango', source: 'taco', category: 'Pratos', name: 'Estrogonofe de frango', proteinPer100g: 14.0, caloriesPer100g: 145, carbsPer100g: 5.5, fatPer100g: 8.0, servingGrams: 150 },
  { id: 'taco-arroz-grega', source: 'taco', category: 'Grãos', name: 'Arroz à grega', proteinPer100g: 3.0, caloriesPer100g: 148, carbsPer100g: 28.0, fatPer100g: 2.4, servingGrams: 100 },
  { id: 'taco-escondidinho', source: 'taco', category: 'Pratos', name: 'Escondidinho de carne seca', proteinPer100g: 8.5, caloriesPer100g: 156, carbsPer100g: 14.0, fatPer100g: 7.0, servingGrams: 200 },

  // === SNACKS / DOCES ===
  { id: 'taco-amendoa', source: 'taco', category: 'Oleaginosas', name: 'Amêndoa torrada', proteinPer100g: 21.1, caloriesPer100g: 581, carbsPer100g: 21.5, fatPer100g: 49.9, servingGrams: 20 },
  { id: 'taco-noz', source: 'taco', category: 'Oleaginosas', name: 'Noz', proteinPer100g: 14.0, caloriesPer100g: 620, carbsPer100g: 18.0, fatPer100g: 59.0, servingGrams: 20 },
  { id: 'taco-castanha-caju', source: 'taco', category: 'Oleaginosas', name: 'Castanha de caju torrada', proteinPer100g: 18.5, caloriesPer100g: 570, carbsPer100g: 29.1, fatPer100g: 46.3, servingGrams: 25 },
  { id: 'taco-pistache', source: 'taco', category: 'Oleaginosas', name: 'Pistache torrado', proteinPer100g: 20.6, caloriesPer100g: 562, carbsPer100g: 27.2, fatPer100g: 45.3, servingGrams: 25 },
  { id: 'taco-chocolate-ao-leite', source: 'taco', category: 'Doces', name: 'Chocolate ao leite', proteinPer100g: 7.6, caloriesPer100g: 535, carbsPer100g: 59.0, fatPer100g: 29.7, servingGrams: 25 },
  { id: 'taco-chocolate-amargo', source: 'taco', category: 'Doces', name: 'Chocolate amargo 70%', proteinPer100g: 7.8, caloriesPer100g: 598, carbsPer100g: 46.0, fatPer100g: 42.6, servingGrams: 25 },
  { id: 'taco-brigadeiro', source: 'taco', category: 'Doces', name: 'Brigadeiro (1 unidade)', proteinPer100g: 5.0, caloriesPer100g: 380, carbsPer100g: 55.0, fatPer100g: 13.5, servingGrams: 20 },
  { id: 'taco-mel', source: 'taco', category: 'Doces', name: 'Mel de abelha', proteinPer100g: 0.4, caloriesPer100g: 309, carbsPer100g: 84.0, fatPer100g: 0, servingGrams: 15 },
  { id: 'taco-biscoito-agua-sal', source: 'taco', category: 'Snacks', name: 'Biscoito água e sal', proteinPer100g: 9.4, caloriesPer100g: 432, carbsPer100g: 70.0, fatPer100g: 11.6, servingGrams: 30 },
  { id: 'taco-biscoito-recheado', source: 'taco', category: 'Snacks', name: 'Biscoito recheado (sabor chocolate)', proteinPer100g: 6.0, caloriesPer100g: 472, carbsPer100g: 71.0, fatPer100g: 19.0, servingGrams: 30 },

  // === BEBIDAS ===
  { id: 'taco-suco-laranja', source: 'taco', category: 'Bebidas', name: 'Suco de laranja natural', proteinPer100g: 0.7, caloriesPer100g: 44, carbsPer100g: 10.4, fatPer100g: 0.1, servingGrams: 200 },
  { id: 'taco-cafe-com-leite', source: 'taco', category: 'Bebidas', name: 'Café com leite (1 xícara)', proteinPer100g: 1.7, caloriesPer100g: 39, carbsPer100g: 4.5, fatPer100g: 1.6, servingGrams: 200 },
  { id: 'taco-achocolatado', source: 'taco', category: 'Bebidas', name: 'Achocolatado em pó com leite', proteinPer100g: 3.2, caloriesPer100g: 88, carbsPer100g: 12.0, fatPer100g: 3.0, servingGrams: 200 },
  { id: 'taco-agua-coco', source: 'taco', category: 'Bebidas', name: 'Água de coco', proteinPer100g: 0.1, caloriesPer100g: 22, carbsPer100g: 5.3, fatPer100g: 0, servingGrams: 200 },
  { id: 'taco-vitamina-banana', source: 'taco', category: 'Bebidas', name: 'Vitamina de banana com leite', proteinPer100g: 2.5, caloriesPer100g: 92, carbsPer100g: 16.0, fatPer100g: 2.0, servingGrams: 250 },
];
