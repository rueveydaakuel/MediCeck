import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import icon from "../../public/home-alt-svgrepo-com.svg";

export default function Navigation() {
  return (
    <Nav>
      <ul>
        <Li>
          <a href="/">
            <Image src={icon} alt="Icon" width={40} height={40} />
          </a>
        </Li>
      </ul>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #d3d3d3;
`;

const Li = styled.li`
  margin-right: 10px;
  list-style-type: none;
`;
