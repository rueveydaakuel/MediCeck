import React from "react";
import styled from "styled-components";

const DeleteCard = ({ onDelete }) => {
  return (
    <ButtonContainer>
      <DeleteButtonText onClick={onDelete}>Löschen</DeleteButtonText>
    </ButtonContainer>
  );
};

export default DeleteCard;

const ButtonContainer = styled.button`
  display: flex;
  margin-top: 20px;
  border: none;
`;

const DeleteButtonText = styled.button`
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  background-color: #a20a0a;
  border: none;
  border-radius: 6px;
  width: 100px;
`;
