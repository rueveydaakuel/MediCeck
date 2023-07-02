import React from "react";
import styled from "styled-components";

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

const Title = styled.h1`
  margin: 0;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>MediCheck</Title>
    </HeaderContainer>
  );
};

export default Header;
