import { Link } from "react-router-dom";
import Cart from "./Cart";
function NavBar() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/store">Store</Link>
      <Cart></Cart>
    </>
  );
}
export default NavBar;
