function ProductCard({ product }) {
  return (
    <>
      <h3>{product.title}</h3>
      <img src={product.url} alt={product.title} />
    </>
  );
}

export default ProductCard;
