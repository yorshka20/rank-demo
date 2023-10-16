import { useCallback, useEffect, useMemo, useState } from "react";
import { useProductContext } from "../context";
import { products } from "../mock";
import type { ProductType, UpdateVoteType } from "../types";
import { arrayEquals } from "../utils";

/**
 * create and initialize the product storage.
 *
 * this storage offers the access and update approach of productInfo for components.
 *
 * @export
 * @return {*}
 */
export function useProductStore() {
  // in real environment, this store should be initialized by request data.
  // and may be connected with the global store like redux.
  return useMemo(() => {
    const storage = new Map<number, ProductType>();
    for (const product of products) {
      storage.set(product.id, product);
    }
    return storage;
  }, []);
}

/**
 * a hook aims at maintaining the rank of products.
 *
 * - offers the ranked productId list to position the component.
 * - offers a update function to update the votes of component.
 *
 * every time the votes updated, we will check if the rank should be updated too.
 *
 * - if rank should be updated, we generate the new rank and make the list rerender.
 * - if rank is not changed, then we only update the target product component
 *   by dispatching a signal to tell the component to rerender itself.
 *
 * @export
 * @return {*}  {[number[], UpdateVoteType]}
 */
export function useProductRankList(): [number[], UpdateVoteType] {
  const { productUpdate$, productStore } = useProductContext();

  const [rankList, setRankList] = useState<number[]>([]);

  // set initial value for rankList
  useEffect(() => {
    const rank = [...products]
      .sort((a, b) => b.votes - a.votes)
      .map((i) => i.id);
    setRankList(rank);
  }, []);

  const updateVote = useCallback(
    (productId: number, vote: number) => {
      console.log("update vote: ", productId, vote);

      const item = productStore.get(productId);
      if (!item) {
        return;
      }

      // update product info first
      productStore.set(productId, { ...item, votes: vote });
      // then emit the signal to update component
      productUpdate$.emit(`product-update-${productId}`, productId);

      // generate the new rank
      const newRank = Array.from(productStore.values())
        // descend rank
        .sort((a, b) => b.votes - a.votes)
        .map((i) => i.id);

      // check if rank should be updated
      if (!arrayEquals(newRank, rankList)) {
        console.log("diff rank, update: ", rankList, newRank);
        setRankList(newRank);
      }
    },
    [productStore, productUpdate$, rankList]
  );

  return [rankList, updateVote];
}

/**
 * this hooks aims at maintaining the productInfo of certain product.
 *
 * you can get the latest snapshot of `productInfo` by subscribing via productId
 *
 * @export
 * @param {number} id
 * @return {*}
 */
export function useSubscribeProductItem(id: number) {
  const { productStore, productUpdate$ } = useProductContext();

  const [product, setProduct] = useState<ProductType>(productStore.get(id)!);

  // we set up a eventListener to receive the signal from rank hook.
  // when signal arrived, we fetch the latest `productInfo` from `productStore`
  // and update it to the component using this hook
  useEffect(() => {
    const handler = (productId: number) => {
      const item = productStore.get(productId);
      item && setProduct(item);
    };

    productUpdate$.on(`product-update-${id}`, handler);

    return () => {
      productUpdate$.off(`product-update-${id}`, handler);
    };
  }, [id, productStore, productUpdate$]);

  return product;
}
