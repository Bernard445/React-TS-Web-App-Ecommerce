import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "../types/product";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return res.data;
};

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
