import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const user = auth.currentUser;
      if (!user || !id) {
        setLoading(false);
        return;
      }

      const docRef = doc(db, "orders", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setOrder(null);
        setLoading(false);
        return;
      }

      setOrder({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div>
      <h2>Order Details</h2>

      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      <p><strong>Date:</strong> {order.createdAt?.toDate().toLocaleString()}</p>

      <h3>Items</h3>
      <ul>
        {order.items.map((item: any) => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            <p>{item.title}</p>
            <p>Qty: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
