import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            return querySnapshot.docs.map((docSnap) => {
                const data = docSnap.data();
                return {
                    id: Number(docSnap.id),
                    title: String(data.title),
                    description: String(data.description),
                    category: String(data.category),
                    price: Number(data.price),
                    image: String(data.image),
                };
            });
        },
    });
};
