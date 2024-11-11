import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "../src/components/CartItem";
import ProductsContext from "../src/components/ProductsContext";

describe("CartItem component", () => {
  const item = {
    id: 1,
    title: "Product 1",
    price: 10,
  };

  const cartItemsArray = [
    [1, 2], // Product 1 with quantity 2
  ];

  const onDelete = vi.fn();

  it("renders the cart item details", () => {
    render(
      <ProductsContext.Provider value={{ cartItemsArray, onDelete }}>
        <CartItem item={item} />
      </ProductsContext.Provider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("2 x 10€")).toBeInTheDocument();
    expect(screen.getByText("20 €")).toBeInTheDocument();
  });

  it("calls onDelete when the delete button is clicked", async () => {
    render(
      <ProductsContext.Provider value={{ cartItemsArray, onDelete }}>
        <CartItem item={item} />
      </ProductsContext.Provider>
    );

    const deleteButton = screen.getByRole("button", { name: /X/i });
    await userEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith(item.id);
  });
});
