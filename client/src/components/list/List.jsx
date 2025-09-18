import Card from "../card/Card";
import "./list.scss";

import React from "react";

const List = ({ posts }) => {
  return (
    <div className="list">
      {posts.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
};

export default List;
