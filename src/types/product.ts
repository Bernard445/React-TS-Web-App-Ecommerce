export interface Product {
  id: string;
  title: string;
  price: number | string;   // 👈 allow both
  category: string;
  description: string;
  image: string;
}
