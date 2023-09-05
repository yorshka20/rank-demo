import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "./App";
import "./setupTests";
// inject seed
import "./mock/seed";
import { arrayEquals } from "./utils";

function getProducts() {
  return window.Seed.products;
}

test("components render check", () => {
  render(<App />);

  // check title rendered
  const title = screen.getByText(/Popular Products/i);
  expect(title).toBeInTheDocument();

  // check product list rendered
  const productList = screen.getByTestId("product-list");
  expect(productList).toBeInTheDocument();

  // check 4 products rendered
  const products = getProducts();
  for (const product of products) {
    const productItem = screen.getByTestId(`product-item-${product.id}`);
    expect(productItem).toBeInTheDocument();
  }
});

test("product item content check", () => {
  render(<App />);

  const products = getProducts();

  for (const product of products) {
    const title = screen.getByText(product.title);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(product.description);
    expect(description).toBeInTheDocument();
  }
});

test("product rank check", () => {
  render(<App />);

  const voteCountList = screen
    .getAllByRole("vote-count")
    .map((i) => Number(i.textContent));

  const rankedVote = voteCountList.sort((a, b) => b - a);
  const equals = arrayEquals(rankedVote, voteCountList);
  expect(equals).toBe(true);
});

test("vote feature", async () => {
  render(<App />);

  const products = getProducts();

  for (const product of products) {
    const voteCount = screen.getByTestId(
      `vote-count-${product.id}`
    ).textContent;
    const voteBtn = screen.getByTestId(`vote-btn-${product.id}`);

    // votes of products will be regenerated every time we render the Component.
    // so we can't use the products data, instead we should get it from dom element.
    const currentValue = Number(voteCount);

    console.log("value", currentValue, product.votes);

    await act(() => {
      voteBtn.click();
    });

    const newCount = screen.getByTestId(`vote-count-${product.id}`);
    expect(newCount).toHaveTextContent(String(currentValue + 1));
  }
});

test("product rank", async () => {
  render(<App />);

  // we do 10 times random click to vote btn.
  // the product list should always be ranked.
  for (let i = 0; i < 20; i++) {
    // 1. find all vote btns
    const voteBtnList = screen.getAllByRole("vote-btn");

    // 2. find a random btn.
    const randomIndex = Math.floor(Math.random() * voteBtnList.length);
    const targetBtn = voteBtnList[randomIndex];

    // 3. click this btn. this should cause a new rank.
    await act(() => {
      targetBtn.click();
    });

    // 4. find current product list
    const voteCountList = screen
      .getAllByRole("vote-count")
      .map((i) => Number(i.textContent));

    // 5. check if the product list is ranked.
    const rankedList = [...voteCountList].sort((a, b) => b - a);
    const equals = arrayEquals(rankedList, voteCountList);
    expect(equals).toBe(true);
  }
});
