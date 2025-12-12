export interface GridItem {
  id: number;
  value: number;
  isPaid: boolean;
  datePaid?: string; // ISO string
}

export interface AppState {
  items: GridItem[];
  totalTarget: number;
  currency: string;
}

export interface Milestone {
  amount: number;
  label: string;
  achieved: boolean;
}