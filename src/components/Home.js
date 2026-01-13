import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import CategorySelect from "../components/CategorySelect";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
const Home = () => {
    const { data: products, isLoading, error } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState("");
    const dispatch = useDispatch();
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    if (error)
        return _jsxs("div", { children: ["Error: ", error.message] });
    const filteredProducts = selectedCategory
        ? products?.filter((product) => product.category?.toLowerCase() === selectedCategory.toLowerCase())
        : products;
    return (_jsxs("div", { children: [_jsx(CategorySelect, { onCategoryChange: setSelectedCategory }), _jsx("h1", { children: "Product List" }), _jsx("ul", { children: filteredProducts?.map((product) => (_jsxs("li", { children: [_jsx("h2", { children: product.title }), _jsx("p", { children: product.description }), _jsxs("p", { children: ["Category: ", product.category] }), _jsxs("p", { children: ["Price: $", Number(product.price ?? 0)] }), _jsx("img", { src: product.image, alt: product.title, width: 100 }), _jsx("button", { onClick: () => dispatch(addItem({
                                id: Number(product.id),
                                title: product.title,
                                price: Number(product.price ?? 0),
                                quantity: 1,
                                image: product.image,
                            })), children: "Add to Cart" }), _jsx("button", { onClick: async () => {
                                await deleteDoc(doc(db, "products", String(product.id)));
                                alert("Product Deleted!");
                                // 👇 OPTIONALLY force refresh React Query
                                window.location.reload();
                            }, children: "Delete Product" })] }, product.id))) })] }));
};
export default Home;
