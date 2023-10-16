import { useCallback } from "react";
import { ProductItem } from "../components/productItem";
import { useProductRankList } from "../hooks";
import { useProductContext } from "../context";

export function ProductPage() {
  // this hook maintains and handles the update of products' rank.
  // Notice: the rankList is a number array which only contains the product.id.
  const [rankList, updateVote] = useProductRankList();

  return (
    <div data-testid="product-list" className={"product-list"}>
      {rankList.map((product) => (
        <ProductItem updateVote={updateVote} id={product} key={product} />
      ))}
    </div>
  );
}
