import PropTypes from "prop-types";
import { useContext } from "react";
import ProductsContext from "./ProductsContext";

function CartItem({ item }) {
  const { onDelete, cartItemsArray } = useContext(ProductsContext);
  const handleDelete = () => {
    onDelete(item.id);
  };

  const quantity = cartItemsArray.find(
    (cartItem) => cartItem[0] === item.id
  )[1];
  const total = item.price * quantity;

  return (
    <div className="smallCard">
      <div>
        <button onClick={handleDelete}> X </button>
        <p>
          {quantity} x {item.price}€
        </p>
        <p>{item.title}</p>
      </div>
      <p>{total} €</p>
    </div>
  );
}

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};
