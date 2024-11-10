import PropTypes from "prop-types";
import { useState } from "react";
function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value)) {
      setQuantity(1);
    } else {
      setQuantity(Number(value));
    }
  };
  const handleAddToCart = () => {
    if (quantity > 0 && Number.isInteger(quantity)) {
      onAdd(product.id, quantity);
    }
  };
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <input
        type="number"
        onChange={onChange}
        min={1}
        max={product.count}
        placeholder="1"
      />
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
  product: PropTypes.object,
  onAdd: PropTypes.func,
};
