import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductsContext from "../src/components/ProductsContext";
import HomePage from "../src/pages/HomePage";

vi.mock("../src/assets/Welcome", () => ({
  default: () => <svg data-testid="welcome-svg" />,
}));

describe("HomePage component", () => {
  it("renders Welcome component", () => {
    render(<HomePage />);
    const welcomeElement = screen.getByTestId("welcome-svg");
    expect(welcomeElement).toBeInTheDocument();
  });

  it("renders Home component", async () => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider>
          <HomePage />
        </ProductsContext.Provider>
      </BrowserRouter>
    );
    const outletElement = screen.getByTestId("homePage");
    expect(outletElement).toBeInTheDocument();
  });
});
