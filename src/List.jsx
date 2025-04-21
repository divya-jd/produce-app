import React from 'react';

const List = ({ items, counts, onAdd }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.name} style={{ marginBottom: "10px" }}>
          <strong>{item.name}</strong> ({item.type})
          <button onClick={() => onAdd(item.name)} style={{ marginLeft: "10px" }}>
            Add
          </button>
          <span style={{ marginLeft: "10px" }}>Count: {counts[item.name] || 0}</span>
        </li>
      ))}
    </ul>
  );
};

export default List;
