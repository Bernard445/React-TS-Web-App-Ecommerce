import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddToCartButton from "./AddToCartButton";

test("calls onAddToCart when button is clicked", () => {
  const mockFn = jest.fn();

  render(<AddToCartButton onAddToCart={mockFn} />);

  fireEvent.click(screen.getByText("Add to Cart"));

  expect(mockFn).toHaveBeenCalledTimes(1);
});
