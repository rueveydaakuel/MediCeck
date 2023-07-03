import React from "react";

const DeleteCard = ({ onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return <button onClick={handleDelete}>Löschen</button>;
};

export default DeleteCard;
