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

     <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredProducts?.map((product) => (
          <li
            key={product.id}
            className="bg-white rounded shadow-md p-4 text-center flex flex-col"
          >
            <img
              className="h-32 mx-auto mb-3 object-contain"
              src={product.image}
              alt={product.title}
            />
            <h2 className="font-bold">{product.title}</h2>
            <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
            <p className="font-semibold my-2">${product.price}</p>

            <button className="mt-auto bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
              onClick={() =>
                dispatch(
                  addItem({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                    image: product.image,
                  })
                )
              }
            >
              Add to Cart
            </button>

            <button
              className="mt-2 bg-red-500 text-white py-1 rounded hover:bg-red-600"
              onClick={async () => {
                await deleteDoc(doc(db, "products", product.id));
                alert("Product Deleted!");
                window.location.reload();
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Home;
