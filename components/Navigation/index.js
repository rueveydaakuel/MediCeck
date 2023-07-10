import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import iconHome from "../../public/home-alt-svgrepo-com.svg";
import iconOverview from "../../public/list-center-svgrepo-com.svg";

export default function Navigation() {
  return (
    <Nav>
      <Link href="/">
        <IconLeft>
          <Image src={iconHome} alt="Icon" width={40} height={40} />
        </IconLeft>
      </Link>
      <Divider />
      <Link href="/overview">
        <IconRight>
          <Image src={iconOverview} alt="Icon" width={40} height={40} />
        </IconRight>
      </Link>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d3d3d3;
`;

const IconLeft = styled.div`
  margin-right: 60px;
`;

const IconRight = styled.div`
  margin-left: 60px;
`;

const Divider = styled.div`
  width: 2px;
  height: 50px;
  background-color: #000;
  margin: 0 10px;
`;
