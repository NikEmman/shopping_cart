import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";
import ProductsContext from "../src/components/ProductsContext";

describe("App component", () => {
  // Mock the fetch function
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1, title: "Product 1", price: 10 }]),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders NavBar component", () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider>
          <App />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("fetches data and updates state", async () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider>
          <App />
        </ProductsContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
});
