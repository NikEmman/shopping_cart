import PropTypes from "prop-types";
import { useState } from "react";

function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  const onChange = (e) => {
    const value = Number(e.target.value);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (quantity > 0 && Number.isInteger(quantity)) {
      onAdd(product.id, quantity);
    }
  };

  return (
    <div className="card" data-testid={"cartItem" + product.id}>
      <img src={product.image} alt={product.title} />
      <select onChange={onChange} value={quantity}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <button onClick={handleAddToCart}>Add to cart</button>
      <details>
        <summary>{product.title}</summary>
        <p>{product.description}</p>
      </details>
      <p>{product.price} €</p>
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
};
