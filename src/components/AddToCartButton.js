import { jsx as _jsx } from "react/jsx-runtime";
const AddToCartButton = ({ onAddToCart }) => {
    return (_jsx("button", { onClick: onAddToCart, children: "Add to Cart" }));
};
export default AddToCartButton;
