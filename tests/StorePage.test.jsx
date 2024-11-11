import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import StorePage from "../src/pages/StorePage";
import ProductsContext from "../src/components/ProductsContext";
import userEvent from "@testing-library/user-event";

describe("StorePage component", () => {
  const data = [
    { id: 1, title: "Product 1", price: 10, image: "/foo" },
    { id: 2, title: "Another Product", price: 20, image: "/bar" },
  ];

  it("has a title", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider
          value={{ data, loading: false, error: null, onAdd: vi.fn() }}
        >
          <StorePage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByRole("heading").textContent).toMatch(
      /Welcome to the Store/i
    );
  });

  it("renders Store component", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider
          value={{ data, loading: false, error: null, onAdd: vi.fn() }}
        >
          <StorePage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );
    const storeElement = screen.getByTestId("store");
    expect(storeElement).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider
          value={{ data, loading: false, error: null, onAdd: vi.fn() }}
        >
          <StorePage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );
    const search = screen.getByPlaceholderText("Search");
    expect(search).toBeInTheDocument();
  });

  it("shows Loading message", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider
          value={{ data: [], loading: true, error: null, onAdd: vi.fn() }}
        >
          <StorePage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Loading products.../i)).toBeInTheDocument();
  });

  it("shows Error message", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider
          value={{
            data: [],
            loading: false,
            error: "Error loading products",
            onAdd: vi.fn(),
          }}
        >
          <StorePage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Error loading products/i)).toBeInTheDocument();
  });

  it("renders product cards", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider
          value={{ data, loading: false, error: null, onAdd: vi.fn() }}
        >
          <StorePage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );
    const productTitle = screen.getByText("Product 1");
    expect(productTitle).toBeInTheDocument();
    const anotherProductTitle = screen.getByText("Another Product");
    expect(anotherProductTitle).toBeInTheDocument();
  });

  it("filters products based on search input", async () => {
    render(
      <BrowserRouter>
        {" "}
        <ProductsContext.Provider
          value={{ data, loading: false, error: null, onAdd: vi.fn() }}
        >
          {" "}
          <StorePage />{" "}
        </ProductsContext.Provider>{" "}
      </BrowserRouter>
    );
    const search = screen.getByPlaceholderText("Search");
    await userEvent.type(search, "Product 1"); // Wait for DOM updates
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.queryByText("Another Product")).not.toBeInTheDocument();
    });
  });

  it("does not render unmatched products based on search input", async () => {
    render(
      <BrowserRouter>
        {" "}
        <ProductsContext.Provider
          value={{ data, loading: false, error: null, onAdd: vi.fn() }}
        >
          {" "}
          <StorePage />{" "}
        </ProductsContext.Provider>{" "}
      </BrowserRouter>
    );
    const search = screen.getByPlaceholderText("Search");
    await userEvent.type(search, "Non-existent Product");
    await waitFor(() => {
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Another Product")).not.toBeInTheDocument();
    });
  });
});
