import React from "react";
import Connection from "./components/Connection";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <div className="containerApp">
        <h3 className="forummoto">Forum Moto</h3>
        <img className="moto" src="/moto-1.jpg" alt="moto" />
        <Connection />
      </div>
    </>
  );
};

export default App;
