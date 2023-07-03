import React from "react";
import styled from "styled-components";
import Title from "../Title/index";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #61acc7;
  color: white;
  padding: 16px;
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>MediCheck</Title>
    </HeaderContainer>
  );
};

export default Header;
