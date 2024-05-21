import React from "react";
import Content from "./Content";

const App = () => {
  return (
    <div>
      <h1 onClick={() => alert("hello")}>Hello, SSR with Koa and Webpack!</h1>
      <input type="text" />
      <Content />
    </div>
  );
};

export default App;
