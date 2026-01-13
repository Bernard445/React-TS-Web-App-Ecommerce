import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
const Cart = ({ count }) => {
    return _jsxs("div", { children: ["Cart: ", count] });
};
const AddToCartButton = ({ onAddToCart }) => {
    return _jsx("button", { onClick: onAddToCart, children: "Add to Cart" });
};
// Tiny wrapper that connects them together (like a mini App)
const TestWrapper = () => {
    const [count, setCount] = useState(0);
    return (_jsxs(_Fragment, { children: [_jsx(Cart, { count: count }), _jsx(AddToCartButton, { onAddToCart: () => setCount((c) => c + 1) })] }));
};
test("adding product updates cart count", () => {
    render(_jsx(TestWrapper, {}));
    // Click the button
    fireEvent.click(screen.getByText("Add to Cart"));
    // Check that the cart shows 1
    expect(screen.getByText(/Cart: 1/i)).toBeInTheDocument();
});
