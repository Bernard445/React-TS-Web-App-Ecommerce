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

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error loading products</div>;

  // Filter if category selected
  const filteredProducts = selectedCategory
    ? products?.filter((p: Product) =>
        p.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Products</h1>

      {/* Category Filter */}
      <div className="mb-6">
        <CategorySelect onCategoryChange={setSelectedCategory} />
      </div>

      {/* Product Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product: Product) => (
          <li
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-3"
            />

            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-sm text-blue-700 font-medium">
              Category: {product.category}
            </p>
            <p className="text-lg font-bold text-green-600 mb-3">
              ${Number(product.price).toFixed(2)}
            </p>

            {/* Add To Cart */}
            <button
              onClick={() =>
                dispatch(
                  addItem({
                    id: Number(product.id),
                    title: product.title,
                    price: Number(product.price),
                    quantity: 1,
                    image: product.image,
                  })
                )
              }
              className="bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>

            {/* Delete only Firestore */}
            {product.source === "firestore" ? (
              <button
                onClick={async () => {
                  await deleteDoc(doc(db, "products", String(product.id)));
                  alert("Product Deleted!");
                  window.location.reload();
                }}
                className="bg-red-600 text-white py-1 rounded mt-2 hover:bg-red-700"
              >
                Delete Product
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white py-1 rounded mt-2 cursor-not-allowed"
              >
                API Product
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
