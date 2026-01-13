import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
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
    if (loading)
        return _jsx("p", { children: "Loading order..." });
    if (!order)
        return _jsx("p", { children: "Order not found." });
    return (_jsxs("div", { children: [_jsx("h2", { children: "Order Details" }), _jsxs("p", { children: [_jsx("strong", { children: "Order ID:" }), " ", order.id] }), _jsxs("p", { children: [_jsx("strong", { children: "Total:" }), " $", order.total.toFixed(2)] }), _jsxs("p", { children: [_jsx("strong", { children: "Date:" }), " ", order.createdAt?.toDate().toLocaleString()] }), _jsx("h3", { children: "Items" }), _jsx("ul", { children: order.items.map((item) => (_jsxs("li", { style: { marginBottom: "10px" }, children: [_jsx("p", { children: item.title }), _jsxs("p", { children: ["Qty: ", item.quantity] }), _jsxs("p", { children: ["Price: $", item.price] })] }, item.id))) })] }));
};
export default OrderDetails;
