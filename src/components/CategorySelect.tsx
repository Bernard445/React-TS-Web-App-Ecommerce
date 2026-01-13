import { useCategories } from '../hooks/useCategories';
import { ChangeEvent } from 'react';

interface CategorySelectProps {
    onCategoryChange: (category: string) => void;
}

export default function CategorySelect({ onCategoryChange }: CategorySelectProps) {
    const { data: categories, isLoading, error } = useCategories();

    if (isLoading) return <div>Loading categories...</div>;
    if (error) return <div>Error loading categories: {(error as Error).message}</div>;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onCategoryChange(e.target.value);
    };

    return (
        <select onChange={handleChange} defaultValue="">
            <option value="">Select a category</option>
            {categories?.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    );
}
