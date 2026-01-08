import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditProduct = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      const docRef = doc(db, "products", id!);
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
      await updateDoc(doc(db, "products", id!), {
        title,
        image,
        price,
        category,
        description,
      });
      alert("Product updated!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <input value={image} onChange={(e) => setImage(e.target.value)} /><br />
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /><br />
      <input value={category} onChange={(e) => setCategory(e.target.value)} /><br />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} /><br />

      <button onClick={handleUpdate}>Save</button>
    </div>
  );
};

export default EditProduct;
