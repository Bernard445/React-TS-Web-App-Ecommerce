import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import type { Product } from "../types/product";
import axios from "axios";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      // Load Firestore products
      const snap = await getDocs(collection(db, "products"));
      const firestoreProducts: Product[] = snap.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,                // string
          title: String(d.title),
          description: String(d.description),
          category: String(d.category),
          price: Number(d.price),
          image: String(d.image),
        };
      });

      // Load API products
      const apiRes = await axios.get("https://fakestoreapi.com/products");
      const apiProducts: Product[] = apiRes.data.map((p: any) => ({
        id: String(p.id), // convert number → string
        title: p.title,
        description: p.description,
        category: p.category,
        price: Number(p.price),
        image: p.image,
      }));

      // Merge both
      return [...firestoreProducts, ...apiProducts];
    },
  });
};
