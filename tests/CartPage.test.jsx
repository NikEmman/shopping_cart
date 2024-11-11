import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CartPage from "../src/pages/CartPage";
import ProductsContext from "../src/components/ProductsContext";

describe("CartPage component", () => {
  const data = [
    { id: 1, title: "Product 1", price: 10 },
    { id: 2, title: "Product 2", price: 20 },
  ];

  const cartItemsArray = [
    [1, 2],
    [2, 1],
  ];

  it("renders the cart heading", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={{ data, cartItemsArray }}>
          <CartPage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", { name: /My cart/i })
    ).toBeInTheDocument();
  });

  it("renders the cart items when there are items in the cart", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={{ data, cartItemsArray }}>
          <CartPage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    const cartItem1 = screen.getByText("Product 1");
    const cartItem2 = screen.getByText("Product 2");

    expect(cartItem1).toBeInTheDocument();
    expect(cartItem2).toBeInTheDocument();
  });

  it("calculates and displays the grand total correctly", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={{ data, cartItemsArray }}>
          <CartPage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    const grandTotal = 10 * 2 + 20 * 1;
    expect(
      screen.getByText(`Your total is: ${grandTotal.toFixed(2)} €`)
    ).toBeInTheDocument();
  });

  it("shows empty cart message when there are no items in the cart", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={{ data, cartItemsArray: [] }}>
          <CartPage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(".....Your cart is empty")).toBeInTheDocument();
  });

  it("includes a link to the checkout page", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={{ data, cartItemsArray }}>
          <CartPage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    const checkoutLink = screen.getByRole("link", {
      name: /Proceed to Payments/i,
    });
    expect(checkoutLink).toBeInTheDocument();
    expect(checkoutLink).toHaveAttribute("href", "/checkout");
  });
});
