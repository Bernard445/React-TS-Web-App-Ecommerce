import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const handleAdd = async () => {
        try {
            await addDoc(collection(db, "products"), {
                title,
                image,
                price,
                category,
                description,
            });
            alert("Product added!");
            setTitle("");
            setImage("");
            setPrice(0);
            setCategory("");
            setDescription("");
        }
        catch (err) {
            alert(err.message);
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Add Product" }), _jsx("input", { placeholder: "Title", value: title, onChange: (e) => setTitle(e.target.value) }), _jsx("br", {}), _jsx("input", { placeholder: "Image URL", value: image, onChange: (e) => setImage(e.target.value) }), _jsx("br", {}), _jsx("input", { type: "number", placeholder: "Price", value: price, onChange: (e) => setPrice(Number(e.target.value)) }), _jsx("br", {}), _jsx("input", { placeholder: "Category", value: category, onChange: (e) => setCategory(e.target.value) }), _jsx("br", {}), _jsx("textarea", { placeholder: "Description", value: description, onChange: (e) => setDescription(e.target.value) }), _jsx("br", {}), _jsx("button", { onClick: handleAdd, children: "Add Product" })] }));
};
export default AddProduct;
