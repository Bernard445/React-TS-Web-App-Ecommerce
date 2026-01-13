export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
export interface FirestoreProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  source: "firestore";
}