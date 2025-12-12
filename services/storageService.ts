import { GridItem, AppState } from '../types';

const STORAGE_KEY = 'cofrinho_2026_data_v2_seq';

export const saveState = (items: GridItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save state", e);
  }
};

export const loadState = (): GridItem[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Failed to load state", e);
    return null;
  }
};

// Generates a sequential grid from 1 to count (e.g., 1 to 300)
export const generateInitialGrid = (count: number): GridItem[] => {
  const items: GridItem[] = [];
  
  for (let i = 1; i <= count; i++) {
    items.push({
      id: i,
      value: i,
      isPaid: false
    });
  }

  return items;
};