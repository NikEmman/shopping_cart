import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import NavBar from "../src/components/NavBar";
import ProductsContext from "../src/components/ProductsContext";

describe("NavBar component", () => {
  const cartItemsArray = [
    [1, 2],
    [2, 3],
  ];

  it("renders the navigation links", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={{ cartItemsArray }}>
          <NavBar />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    const homeLink = screen.getByRole("link", { name: /Home/i });
    const storeLink = screen.getByRole("link", { name: /Store/i });
    const cartLink = screen.getByRole("link", { name: /Cart/i });

    expect(homeLink).toBeInTheDocument();
    expect(storeLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });

  it("displays the correct cart item count", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={{ cartItemsArray }}>
          <NavBar />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    const cartCount = screen.getByText("5");
    expect(cartCount).toBeInTheDocument();
  });

  it("links navigate to the correct routes", async () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider value={{ cartItemsArray }}>
          <NavBar />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    const homeLink = screen.getByRole("link", { name: /Home/i });
    const storeLink = screen.getByRole("link", { name: /Store/i });
    const cartLink = screen.getByRole("link", { name: /Cart/i });

    expect(homeLink.getAttribute("href")).toBe("/");
    expect(storeLink.getAttribute("href")).toBe("/store");
    expect(cartLink.getAttribute("href")).toBe("/cart");

    // Simulate navigation
    await userEvent.click(homeLink);
    expect(window.location.pathname).toBe("/");
    await userEvent.click(storeLink);
    expect(window.location.pathname).toBe("/store");
    await userEvent.click(cartLink);
    expect(window.location.pathname).toBe("/cart");
  });
});
