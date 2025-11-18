
// function Categories() {


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="heb-category-page container">
      <h2 className="heb-category-title">All Categories</h2>

      <div className="heb-category-grid">
        {categories.map((cat) => (
          <Link to={`${cat.name.toLowerCase()}`} key={cat._id} className="heb-category-card">
            <img src={cat.image} alt={cat.name} />
            <h3>{cat.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
