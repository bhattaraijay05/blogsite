import React, { useRef } from "react";
import Link from "next/link";
import { categories } from "./allCategories";
var slugify = require("slugify");

const Categories = () => {
  return (
    <>
      <p className="text-center text-2xl mb-5 font-bold">
        Choose your Category
      </p>
      {categories.map((category, index) => (
        <React.Fragment key={index}>
          <Link href={`/categories/${slugify(category)}`}>
            <button className="text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              {category}
            </button>
          </Link>
        </React.Fragment>
      ))}
    </>
  );
};

export default Categories;
