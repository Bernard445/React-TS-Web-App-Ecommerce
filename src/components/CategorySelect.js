import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCategories } from '../hooks/useCategories';
export default function CategorySelect({ onCategoryChange }) {
    const { data: categories, isLoading, error } = useCategories();
    if (isLoading)
        return _jsx("div", { children: "Loading categories..." });
    if (error)
        return _jsxs("div", { children: ["Error loading categories: ", String(error)] });
    const handleChange = (e) => {
        onCategoryChange(e.target.value);
    };
    return (_jsxs("select", { onChange: handleChange, defaultValue: "", children: [_jsx("option", { value: "", children: "Select a category" }), categories?.map((category) => (_jsx("option", { value: category, children: category }, category)))] }));
}
