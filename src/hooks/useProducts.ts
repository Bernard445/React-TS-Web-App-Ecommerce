import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/firebase.config";
import type { Product } from "../types/product";

async function fetchProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title ?? "",
      description: data.description ?? "",
      category: data.category ?? "",
      price: Number(data.price ?? 0),   // << 💥 MAGIC FIX
      image: data.image ?? "",
    } as Product;
  });
}

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
