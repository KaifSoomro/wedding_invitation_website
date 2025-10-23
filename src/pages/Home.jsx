import HeaderComp from "@/components/home/HeaderComp";
import TrendingCardComp from "@/components/home/TrendingCardComp";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="px-4 lg:px-20">
        <HeaderComp />
        <TrendingCardComp />
      </div>
    </>
  );
};

export default Home;
