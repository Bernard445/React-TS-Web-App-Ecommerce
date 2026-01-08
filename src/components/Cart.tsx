import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { auth, db } from "../firebase/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";



const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

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


  return (
    <div>
      <h2>Cart</h2>

      {items.map(item => (
        <div key={item.id}>
          <img src={item.image} width={50} />
          <p>{item.title}</p>
          <p>Qty: {item.quantity}</p>
          <p>${item.price}</p>
          <button onClick={() => dispatch(removeItem(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>

      <button onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
