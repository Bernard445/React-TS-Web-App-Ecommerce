import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
const Orders = () => {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [orders, setOrders] = useState([]);
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
                const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
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
            }
            catch (err) {
                console.error("🔥 FIRESTORE ERROR:", err);
            }
            setLoadingOrders(false);
        });
        return () => unsubscribe();
    }, []);
    if (loadingUser || loadingOrders)
        return _jsx("p", { children: "Loading orders..." });
    if (!firebaseUser)
        return _jsx("p", { children: "Please log in to view orders." });
    if (orders.length === 0)
        return _jsx("p", { children: "No orders found." });
    return (_jsxs("div", { children: [_jsx("h2", { children: "Your Orders" }), _jsx("ul", { children: orders.map((order) => (_jsxs("li", { onClick: () => window.location.href = `/orders/${order.id}`, style: { marginBottom: "20px", cursor: "pointer" }, children: [_jsxs("p", { children: [_jsx("strong", { children: "Order ID:" }), " ", order.id] }), _jsxs("p", { children: [_jsx("strong", { children: "Total:" }), " $", order.total.toFixed(2)] }), _jsxs("p", { children: [_jsx("strong", { children: "Items:" }), " ", order.items.length] }), _jsxs("p", { children: [_jsx("strong", { children: "Date:" }), " ", order.createdAt?.toDate().toLocaleString()] })] }, order.id))) })] }));
};
export default Orders;
