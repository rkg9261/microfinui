import React from "react";
import { FaTrash } from "react-icons/fa";
import "./Button.css";

const DeleteButton = ({
  children = "Delete",
  onClick,
}) => {
  return (
    <button
      className="btn btn-delete"
      onClick={onClick}
    >
      <FaTrash />
      {children}
    </button>
  );
};

export default DeleteButton;