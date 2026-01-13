import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
const EditProduct = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
        const loadProduct = async () => {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTitle(data.title);
                setImage(data.image);
                setPrice(data.price);
                setCategory(data.category);
                setDescription(data.description);
            }
        };
        loadProduct();
    }, [id]);
    const handleUpdate = async () => {
        try {
            await updateDoc(doc(db, "products", id), {
                title,
                image,
                price,
                category,
                description,
            });
            alert("Product updated!");
        }
        catch (err) {
            alert(err.message);
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Edit Product" }), _jsx("input", { value: title, onChange: (e) => setTitle(e.target.value) }), _jsx("br", {}), _jsx("input", { value: image, onChange: (e) => setImage(e.target.value) }), _jsx("br", {}), _jsx("input", { type: "number", value: price, onChange: (e) => setPrice(Number(e.target.value)) }), _jsx("br", {}), _jsx("input", { value: category, onChange: (e) => setCategory(e.target.value) }), _jsx("br", {}), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value) }), _jsx("br", {}), _jsx("button", { onClick: handleUpdate, children: "Save" })] }));
};
export default EditProduct;
