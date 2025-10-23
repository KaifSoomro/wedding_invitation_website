import React from "react";
import Card from "../Card";
import { templates } from "@/TemplateData";
import { Link } from "react-router-dom";
import { RouteEditor } from "@/helpers/RouteNames";
import { useSelector } from "react-redux";

const TempContent = () => {
  const filters = useSelector((state) => state.temp);
  const filteredData = templates.filter((item) => {
    const matchesOrientation =
      filters.orientation.length === 0 ||
      filters.orientation.includes(item.orientation);

    const matchesTheme =
      filters.theme.length === 0 ||
      filters.theme.some((theme) => item.theme.includes(theme));

    const matchesCategory =
      filters.category.length === 0 ||
      filters.category.includes(item.categorie);

    return matchesOrientation && matchesTheme && matchesCategory;
  });

  return (
    <div className="mt-20 w-full">
      <h3>{filteredData.length} designs</h3>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-0 md:mt-6 lg:mt-10">
        {filteredData.map((t) => (
          <Link to={`${RouteEditor}/${t.id}`}>
            <Card values={t} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TempContent;
