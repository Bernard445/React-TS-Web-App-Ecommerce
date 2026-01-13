import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";
import CategorySelect from "../components/CategorySelect";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import type { AppDispatch } from "../redux/store";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const Home: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredProducts = selectedCategory
  ? products?.filter((product: Product) =>
      product.category?.toLowerCase() === selectedCategory.toLowerCase()
    )
  : products;


  return (
    <div>
      <CategorySelect onCategoryChange={setSelectedCategory} />

      <h1>Product List</h1>

      <ul>
        {filteredProducts?.map((product: Product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${Number(product.price ?? 0)}</p>
            <img src={product.image} alt={product.title} width={100} />

            <button
              onClick={() =>
                dispatch(
                  addItem({
                    id: Number(product.id),
                    title: product.title,
                    price: Number(product.price ?? 0),
                    quantity: 1,
                    image: product.image,
                  })
                )
              }
            >
              Add to Cart
            </button>


            <button
              onClick={async () => {
                await deleteDoc(doc(db, "products", String(product.id)));

                alert("Product Deleted!");

                // 👇 OPTIONALLY force refresh React Query
                window.location.reload();
              }}
            >
              Delete Product
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
