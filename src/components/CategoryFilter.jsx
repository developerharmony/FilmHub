import React from "react";
import Button from "./ui/Button";
import { categories } from "../utils/constants";

const CategoryFilter = ({ selectedCategory, onCategoryChange, theme }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={
            selectedCategory === category.id
              ? `${theme.colors.primary} text-white shadow-lg text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2`
              : `${theme.colors.cardBg} ${theme.colors.text} hover:shadow-md text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2`
          }
        >
          <i className={`${category.icon} mr-1 sm:mr-2`}></i>
          <span>{category.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;