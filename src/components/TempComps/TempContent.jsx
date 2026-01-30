import React, { useState, useEffect } from "react";
import Card from "../Card";
import { templates } from "@/TemplateData";
import { Link } from "react-router-dom";
import { RouteEditor } from "@/helpers/RouteNames";
import { useSelector } from "react-redux";
import { templateStorage } from "@/services/templateStorage";

const TempContent = () => {
  const filters = useSelector((state) => state.temp);
  const [allTemplates, setAllTemplates] = useState([]);
  
  // Load templates on mount and refresh
  useEffect(() => {
    const loadTemplates = () => {
      const merged = templateStorage.getMergedTemplates(templates);
      console.log("Loaded templates:", merged.length, merged);
      setAllTemplates(merged);
    };
    
    loadTemplates();
    
    // Listen for storage changes (when templates are saved)
    const handleStorageChange = () => {
      loadTemplates();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('templateUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('templateUpdated', handleStorageChange);
    };
  }, []);
  
  const filteredData = allTemplates.filter((item) => {
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
          <Link key={t.id} to={`${RouteEditor}/${t.id}`}>
            <div className="relative">
              <Card values={t} />
              {t.categorie === "custom" && (
                <div className="absolute top-2 right-2 bg-violet-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                  Custom
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TempContent;
