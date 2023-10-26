import React from "react";
import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";

const Home = ({ mode, setMode }) => {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      <Subscribe mode={mode} setMode={setMode} />
    </div>
  );
};

export default Home;
