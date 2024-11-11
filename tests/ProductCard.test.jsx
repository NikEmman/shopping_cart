import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../src/components/ProductCard";

describe("ProductCard component", () => {
  const product = {
    id: 1,
    title: "Product 1",
    price: 10,
    image: "/foo",
    description: "This is a product description",
    count: 5,
  };

  const onAdd = vi.fn();

  it("renders product details", () => {
    render(<ProductCard product={product} onAdd={onAdd} />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(
      screen.getByText("This is a product description")
    ).toBeInTheDocument();
    expect(screen.getByText("10 €")).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", product.image);
    expect(img).toHaveAttribute("alt", product.title);
  });

  it("sets the initial quantity to 1", () => {
    render(<ProductCard product={product} onAdd={onAdd} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("1");
  });

  it("updates quantity on selection change", async () => {
    render(<ProductCard product={product} onAdd={onAdd} />);
    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "3");
    expect(select).toHaveValue("3");
  });

  it("calls onAdd with correct arguments when Add to cart is clicked", async () => {
    render(<ProductCard product={product} onAdd={onAdd} />);
    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "3");
    const button = screen.getByRole("button", { name: /Add to cart/i });
    await userEvent.click(button);
    expect(onAdd).toHaveBeenCalledWith(1, 3);
  });
});
