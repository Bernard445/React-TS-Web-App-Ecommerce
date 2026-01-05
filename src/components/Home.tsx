import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";
import CategorySelect from "../components/CategorySelect";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import type { AppDispatch } from "../redux/store";



const Home: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredProducts = selectedCategory
    ? products?.filter((product: Product) => product.category === selectedCategory)
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
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.title} width={100} />
        <button
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
