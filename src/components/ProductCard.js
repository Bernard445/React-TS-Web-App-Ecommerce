import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ProductCard = ({ title, price }) => {
    return (_jsxs("div", { children: [_jsx("h2", { children: title }), _jsxs("p", { children: ["$", price] })] }));
};
export default ProductCard;
