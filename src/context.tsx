import EventEmitter from "events";
import React, { useContext, useMemo } from "react";
import type { ProductStoreType, ProductType } from "./types";

type ProductContextType = {
  productStore: Map<number, ProductType>;
  productUpdate$: EventEmitter;
};

const ProductContext = React.createContext<ProductContextType>(
  {} as ProductContextType
);

export function useProductContext() {
  return useContext(ProductContext);
}

type ContextProps = {
  children: React.ReactNode;
  productStore: ProductStoreType;
  update$: EventEmitter;
};

/**
 * this context aims at sharing data between different components
 *
 * we will put
 *
 * - `productStore`: a Map object stores the productInfo
 * - `update$`: an eventEmitter for signal dispatching
 *
 * at the context.
 *
 * @param {ContextProps} {
 *   children,
 *   productStore,
 *   update$,
 * }
 * @return {*}
 */
export const ProductContextProvider = ({
  children,
  productStore,
  update$,
}: ContextProps) => {
  // make sure the value of context not changed during rendering to avoid
  // thorough rerendering of the whole components tree.
  const contextValue: ProductContextType = useMemo(
    () => ({
      productStore,
      productUpdate$: update$,
    }),
    [productStore, update$]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
