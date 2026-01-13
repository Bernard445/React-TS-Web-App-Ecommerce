import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import type { Product } from "../types/product";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      // 1️⃣ Get API products
      const apiRes = await axios.get<Product[]>("https://fakestoreapi.com/products");
      const apiProducts = apiRes.data.map((p) => ({
        ...p,
        id: String(p.id),        // normalize to string
        price: Number(p.price),
        source: "api" as const,  // identify source
      }));

      // 2️⃣ Get Firestore products
      const snap = await getDocs(collection(db, "products"));
      const fsProducts = snap.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: Number(docSnap.id),
          title: String(data.title),
          description: String(data.description),
          category: String(data.category),
          price: Number(data.price),
          image: String(data.image),
          source: "firestore" as const,};
      });

      // 3️⃣ Combine without duplicates
      return [...fsProducts, ...apiProducts];
    },
  });
};
