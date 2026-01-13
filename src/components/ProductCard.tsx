type ProductCardProps = {
  title: string;
  price: number;
};

const ProductCard = ({ title, price }: ProductCardProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>${price}</p>
    </div>
  );
};

export default ProductCard;
