import PropTypes from "prop-types";
import { useState } from "react";
function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        min={1}
        max={product.count}
      />
      <button onClick={() => onAdd(product.id, parseInt(quantity))}>
        Add to cart
      </button>
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
