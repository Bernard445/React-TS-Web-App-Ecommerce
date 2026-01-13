import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../redux/cartSlice";
import { auth, db } from "../firebase/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
const Cart = () => {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const handleCheckout = async () => {
        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to checkout");
            return;
        }
        const orderData = {
            userId: user.uid,
            items,
            total: totalPrice,
            createdAt: serverTimestamp(),
        };
        await addDoc(collection(db, "orders"), orderData);
        dispatch(clearCart());
        alert("Order placed!");
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Cart" }), items.map(item => (_jsxs("div", { children: [_jsx("img", { src: item.image, width: 50 }), _jsx("p", { children: item.title }), _jsxs("p", { children: ["Qty: ", item.quantity] }), _jsxs("p", { children: ["$", item.price] }), _jsx("button", { onClick: () => dispatch(removeItem(item.id)), children: "Remove" })] }, item.id))), _jsxs("p", { children: ["Total Items: ", totalItems] }), _jsxs("p", { children: ["Total Price: $", totalPrice.toFixed(2)] }), _jsx("button", { onClick: handleCheckout, children: "Checkout" })] }));
};
export default Cart;
