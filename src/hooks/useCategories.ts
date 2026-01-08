import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategories = async (): Promise<string[]> => {
  const res = await axios.get<string[]>(
    "https://fakestoreapi.com/products/categories"
  );
  return res.data;
};

export const useCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
