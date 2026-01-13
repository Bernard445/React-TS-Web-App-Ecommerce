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
  const { data: products = [], isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error loading products</div>;

  // Filter if category selected
  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter((p) =>
          p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Products</h1>

      {/* Category Filter */}
      <div className="mb-6">
        <CategorySelect onCategoryChange={setSelectedCategory} />
      </div>

      {/* Product Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product: Product) => (
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
                    id: product.id,               // string
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

            {/* Delete ONLY if this product exists in Firestore */}
            <button
              onClick={async () => {
                // if delete fails, ignore (API products will error)
                try {
                  await deleteDoc(doc(db, "products", product.id));
                  alert("Product Deleted!");
                  window.location.reload();
                } catch {}
              }}
              className="bg-red-600 text-white py-1 rounded mt-2 hover:bg-red-700"
            >
              Delete (Firestore only)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
