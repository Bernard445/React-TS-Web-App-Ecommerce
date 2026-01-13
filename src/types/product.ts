export interface Product {
  id: string;     // Firestore document ID
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
