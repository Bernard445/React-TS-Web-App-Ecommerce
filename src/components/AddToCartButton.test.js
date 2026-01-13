import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import AddToCartButton from "./AddToCartButton";
test("calls onAddToCart when button is clicked", () => {
    const mockFn = jest.fn();
    render(_jsx(AddToCartButton, { onAddToCart: mockFn }));
    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockFn).toHaveBeenCalledTimes(1);
});
