import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
test("renders product title", () => {
    render(_jsx(ProductCard, { title: "Shampoo", price: 10 }));
    expect(screen.getByText("Shampoo")).toBeInTheDocument();
});
