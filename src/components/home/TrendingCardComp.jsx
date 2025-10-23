import React, { useEffect, useState } from "react";
import Card from "../Card";
import { Link } from "react-router-dom";
import { RouteEditor } from "@/helpers/RouteNames";
import { templates } from "@/TemplateData";

const TrendingCardComp = () => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const onlyTrendingData = templates.filter(
      (t) => t.term === "trending"
    );
    setNewData(onlyTrendingData);
  }, []);

  return (
    <>
      <div className="w-full text-center md:text-start md:mt-10 mt-7">
        <h1 className="text-3xl font-semibold mb-4 md:mb-0">Trending Cards</h1>
      </div>
      <div className="w-full relative md:pt-10 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10">
        {newData.map((values) => (
          <Link to={RouteEditor + "/" + values.id} key={values.name+values.id} className="mx-auto">
            <Card values={values} />
            <h1 className="mt-1 text-lg text-gray-500">{values.name}</h1>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TrendingCardComp;
