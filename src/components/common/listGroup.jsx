import React from "react";

const ListGroup = ({ items, onItemSelect, selectedItem }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          className={
            "list-group-item" + (item === selectedItem ? " active" : "")
          }
          key={item._id}
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
