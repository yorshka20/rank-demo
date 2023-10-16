import React from "react";
import type { ProductType, UpdateVoteType } from "../../types";
import { Vote } from "../voteItem";

import "./style.css";

interface ProductItemProps {
  id: number;
  updateVote: UpdateVoteType;
  getProductInfo: (id: number) => ProductType;
}

export const ProductItem = React.memo((props: ProductItemProps) => {
  const { id, updateVote, getProductInfo } = props;

  // get product info from the context
  const product = getProductInfo(id);

  console.log("rerender productItem: ", product.title, product.votes);

  const {
    productImageUrl,
    votes,
    title,
    description,
    url,
    submitterAvatarUrl,
  } = product;

  return (
    <div data-testid={`product-item-${id}`} className={"product-item"}>
      <img className={"product-image"} src={productImageUrl} alt="" />
      <div className={"product-info"}>
        <Vote id={id} voteCount={votes} updateVote={updateVote} />
        <div className={"product-content"}>
          <a className={"title"} href={url}>
            {title}
          </a>
          <p>{description}</p>
        </div>
        <div className={"product-author"}>
          <span className={"submitted"}>Submitted by:</span>
          <img className={"author"} src={submitterAvatarUrl} alt="" />
        </div>
      </div>
    </div>
  );
});
