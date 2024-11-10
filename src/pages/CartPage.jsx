import { useContext } from "react";
import ProductsContext from "../components/ProductsContext";
import CartItem from "../components/CartItem";

function CartPage() {
  const { data, cartItemsArray } = useContext(ProductsContext);

  const cartItemIds = cartItemsArray.map((item) => item[0]);
  const filteredData = data.filter((item) => cartItemIds.includes(item.id));

  const cartItems = filteredData.map((item) => (
    <CartItem key={item.id} item={item} />
  ));

  const grandTotal = filteredData.reduce((total, product) => {
    const itemInCart = cartItemsArray.find((item) => item[0] === product.id);
    const quantity = itemInCart ? itemInCart[1] : 0;
    return total + product.price * quantity;
  }, 0);

  return (
    <>
      <h1>My cart</h1>
      {cartItems}
      <hr />
      <p>Your total is: {grandTotal}</p>
    </>
  );
}

export default CartPage;
