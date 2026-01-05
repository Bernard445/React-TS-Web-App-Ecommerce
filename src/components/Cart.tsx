import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../redux/store";


const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

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

      <button onClick={() => dispatch(clearCart())}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
