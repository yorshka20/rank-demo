import EventEmitter from "events";
import { useRef } from "react";

import { ProductContextProvider } from "./context";
import { useProductStore } from "./hooks";
import { ProductPage } from "./pages";

import "./App.css";

function App() {
  // an event pipe for signal dispatching.
  // this is used for meticulous rendering control of product component.
  const update$Ref = useRef<EventEmitter>(new EventEmitter());

  // we made a hook to create and initialize the product info.
  const productStore = useProductStore();

  // we provide a context to share data between different components.
  return (
    <ProductContextProvider
      productStore={productStore}
      update$={update$Ref.current}
    >
      <div className="App">
        <h1 className="header">Popular Products</h1>
        <div className={"divider"} />
        <ProductPage />
      </div>
    </ProductContextProvider>
  );
}

export default App;
