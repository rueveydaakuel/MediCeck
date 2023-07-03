import React from "react";
import styled from "styled-components";

const DeleteCard = ({ onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <ButtonContainer>
      <DeleteButtonText onClick={handleDelete}>Löschen</DeleteButtonText>
    </ButtonContainer>
  );
};

export default DeleteCard;

const ButtonContainer = styled.div`
  display: flex;

  margin-top: 20px;
`;

const DeleteButtonText = styled.span`
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  background-color: #a20a0a;
  border: none;
  border-radius: 8px;
  width: 100px;
`;
