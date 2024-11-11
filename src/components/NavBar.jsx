import { useContext } from "react";
import ProductsContext from "../components/ProductsContext";

import { Link } from "react-router-dom";
function NavBar() {
  const { cartItemsArray } = useContext(ProductsContext);
  const totalItems = cartItemsArray.reduce((sum, item) => sum + item[1], 0);
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/store">Store</Link>
      <Link to="/cart" className="cartIcon">
        Cart<span id="cartCount">{totalItems}</span>
      </Link>
    </nav>
  );
}
export default NavBar;
