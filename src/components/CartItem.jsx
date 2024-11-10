import PropTypes from "prop-types";
import { useContext } from "react";
import ProductsContext from "./ProductsContext";

function CartItem({ item }) {
  const { onDelete, cartItemsArray } = useContext(ProductsContext);
  const handleDelete = () => {
    console.log(`Deleting ${item.title}`);
    onDelete(item.id);
  };

  const quantity = cartItemsArray.find(
    (cartItem) => cartItem[0] === item.id
  )[1];

  return (
    <div className="smallCard">
      <p>{item.title}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={handleDelete}> X </button>
    </div>
  );
}

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};