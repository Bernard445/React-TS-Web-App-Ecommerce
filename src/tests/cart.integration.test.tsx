import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Fake Cart component just for this test
type CartProps = {
  count: number;
};

const Cart = ({ count }: CartProps) => {
  return <div>Cart: {count}</div>;
};

// Fake AddToCartButton component just for this test
type AddToCartButtonProps = {
  onAddToCart: () => void;
};

const AddToCartButton = ({ onAddToCart }: AddToCartButtonProps) => {
  return <button onClick={onAddToCart}>Add to Cart</button>;
};

// Tiny wrapper that connects them together (like a mini App)
const TestWrapper = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Cart count={count} />
      <AddToCartButton onAddToCart={() => setCount((c) => c + 1)} />
    </>
  );
};

test("adding product updates cart count", () => {
  render(<TestWrapper />);

  // Click the button
  fireEvent.click(screen.getByText("Add to Cart"));

  // Check that the cart shows 1
  expect(screen.getByText(/Cart: 1/i)).toBeInTheDocument();
});
