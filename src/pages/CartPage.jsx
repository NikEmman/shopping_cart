import { useContext } from "react";
import ProductsContext from "../components/ProductsContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
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
    <div className="cart">
      <h1>My cart</h1>
      {cartItemsArray.length > 0 ? (
        <>
          {cartItems} <hr />{" "}
          <p id="total">Your total is: {grandTotal.toFixed(2)} €</p>
          <Link to="/checkout">Proceed to Payments</Link>
        </>
      ) : (
        <p>.....Your cart is empty</p>
      )}
    </div>
  );
}

export default CartPage;
