import React, { useState } from "react";
import "./Filter.scss";
import { useSearchParams } from "react-router-dom";
const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("city"));

  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    maxPrice: searchParams.get("maxPrice") || 10000000,
    minPrice: searchParams.get("minPrice") || 0,
    bedroom: searchParams.get("bedroom") || 1,
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>{" "}
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            onChange={handleChange}
            name="type"
            id="type"
            defaultValue={query.type}
          >
            <option value="any">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>{" "}
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            onChange={handleChange}
            name="property"
            id="property"
            defaultValue={query.property}
          >
            <option value="any">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>{" "}
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            defaultValue={query.minPrice}
            onChange={handleChange}
          />
        </div>{" "}
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="Number"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            defaultValue={query.maxPrice}
            onChange={handleChange}
          />
        </div>{" "}
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="number"
            id="bedroom"
            name="bedroom"
            min={0}
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Filter;
