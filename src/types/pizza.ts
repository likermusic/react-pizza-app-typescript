export type Size = 26 | 30 | 40;
export type Type = 0 | 1;

export type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: Type[];
  sizes: Size[];
  price: number;
  category: number;
  rating: number;
};
