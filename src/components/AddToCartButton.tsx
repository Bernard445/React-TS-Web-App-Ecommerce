type AddToCartButtonProps = {
  onAddToCart: () => void;
};

const AddToCartButton = ({ onAddToCart }: AddToCartButtonProps) => {
  return (
    <button onClick={onAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
