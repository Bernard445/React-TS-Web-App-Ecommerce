import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Orders = () => {
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    // Wait for Firebase auth to initialize
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("AUTH STATE:", currentUser);

      if (!currentUser) {
        setFirebaseUser(null);
        setLoadingUser(false);
        setLoadingOrders(false);
        return;
      }

      setFirebaseUser(currentUser);
      setLoadingUser(false);

      try {
        const q = query(
            collection(db, "orders"),
            where("userId", "==", currentUser.uid)
        );


        console.log("📦 Fetching orders for UID:", currentUser.uid);

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          console.log("📦 No orders found");
          setOrders([]);
          setLoadingOrders(false);
          return;
        }

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("📦 Orders found:", data);
        setOrders(data);
      } catch (err) {
        console.error("🔥 FIRESTORE ERROR:", err);
      }

      setLoadingOrders(false);
    });

    return () => unsubscribe();
  }, []);

  if (loadingUser || loadingOrders) return <p>Loading orders...</p>;
  if (!firebaseUser) return <p>Please log in to view orders.</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div>
      <h2>Your Orders</h2>

      <ul>
        {orders.map((order) => (
        <li
            key={order.id}
            onClick={() => window.location.href = `/orders/${order.id}`}
            style={{ marginBottom: "20px", cursor: "pointer" }}
            >
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Items:</strong> {order.items.length}</p>
            <p><strong>Date:</strong> {order.createdAt?.toDate().toLocaleString()}</p>
        </li>

        ))}
      </ul>
    </div>
  );
};

export default Orders;
