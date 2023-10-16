import React from "react";
import type { UpdateVoteType } from "../../types";
import { Vote } from "../voteItem";

import { useSubscribeProductItem } from "../../hooks";
import "./style.css";

interface ProductItemProps {
  id: number;
  updateVote: UpdateVoteType;
}

export const ProductItem = React.memo((props: ProductItemProps) => {
  const { id, updateVote } = props;

  const product = useSubscribeProductItem(id);

  return (
    <div data-testid={`product-item-${id}`} className={"product-item"}>
      <img className={"product-image"} src={product.productImageUrl} alt="" />
      <div className={"product-info"}>
        <Vote id={id} voteCount={product.votes} updateVote={updateVote} />
        <div className={"product-content"}>
          <a className={"title"} href={product.url}>
            {product.title}
          </a>
          <p>{product.description}</p>
        </div>
        <div className={"product-author"}>
          <span className={"submitted"}>Submitted by:</span>
          <img className={"author"} src={product.submitterAvatarUrl} alt="" />
        </div>
      </div>
    </div>
  );
});
