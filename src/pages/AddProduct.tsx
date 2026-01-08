import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState<number>(0);
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
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>

      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} /><br />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} /><br />
      <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} /><br />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />

      <button onClick={handleAdd}>Add Product</button>
    </div>
  );
};

export default AddProduct;
