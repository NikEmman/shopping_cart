import { Link } from "react-router-dom";
import Cart from "./Cart";
function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/store">Store</Link>
      <Cart></Cart>
    </nav>
  );
}
export default NavBar;
