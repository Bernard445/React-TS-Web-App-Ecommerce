import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "products"));
      return snapshot.docs.map(
        doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            category: data.category,
            description: data.description,
            image: data.image,
            price: Number(data.price),   // 👈 THE FIX
          } as Product;
        }
      );
    },
  });
}
