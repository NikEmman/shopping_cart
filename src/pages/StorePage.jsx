import ProductCard from "../components/ProductCard";
import { useState, useContext } from "react";
import ProductsContext from "../components/ProductsContext";

function StorePage() {
  const [searchValue, setSearchValue] = useState("");
  const { data, loading, error, onAdd } = useContext(ProductsContext);

  const products =
    data &&
    data
      .filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          onAdd={onAdd}
        ></ProductCard>
      ));

  return (
    <div className="store" data-testid="store">
      <h1>Welcome to the Store</h1>
      <input
        type="text"
        placeholder="Search"
        id="searchBar"
        onInput={(e) => setSearchValue(e.target.value)}
      />
      <div>
        {loading && <div>Loading products...</div>}
        {error && <div>{error}</div>}
      </div>
      <div className="cardContainer">{data && products}</div>
    </div>
  );
}

export default StorePage;
