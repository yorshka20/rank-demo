import React from "react";
import { useSubscribeProductItem } from "../../hooks";
import type { UpdateVoteType } from "../../types";
import { Vote } from "../voteItem";

import "./style.css";

interface ProductItemProps {
  id: number;
  updateVote: UpdateVoteType;
}

export const ProductItem = React.memo((props: ProductItemProps) => {
  const { id, updateVote } = props;

  // get the latest snapshot of `productInfo` from this hook.
  const product = useSubscribeProductItem(id);

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
