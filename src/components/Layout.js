import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menu_bar from "./icon/menubar_hamburger.png";
import close_bar from "./icon/menubar_close.png";
import { useSelector } from "react-redux";

import logo from "./icon/igo.JPG";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";

import "./component.css";

export default function Layout({ children }) {
  // const userId = useSelector(state => state.login.userId);
  // const isToken = useSelector(state => state.login.isToken);

  // useEffect(() => {
  //   console.log("is useEffect work?");
  //   const isToken = null;
  //   const userId = null;
  //   const isToken2 = isNull(isToken).then(console.log(isToken2));
  //   console.log(isToken);
  //   if (isToken !== null) {
  //     console.log("is it work?");
  //     window.sessionStorage.getItem("userId", userId);
  //   }
  // }, []);

  // const isNull = isToken => {
  //   window.sessionStorage.getItem("accessToken", isToken);
  //   return isToken;
  // };
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleClickMenu = () => {
    const x =
      document.getElementById("menu-img") ||
      document.getElementById("close-img");
    const y =
      document.getElementById("open-button") ||
      document.getElementById("close-button");
    if (x.src === menu_bar) {
      x.src = close_bar;
      x.id = "close-img";
      y.id = "close-button";
    } else {
      x.src = menu_bar;
      x.id = "menu-img";
      y.id = "open-button";
    }
  };
  return (
    <>
      <Navbar color="" light expand="md" style={{ margin: "0 20vw 0 20vw" }}>
        <NavbarBrand tag={Link} to="/">
          Egluu
          {/* <img src={logo} alt="menubar" id="menu-img" width="100" /> */}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/projects">
                프로젝트 목록보기
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/people">
                사용자 목록보기
              </NavLink>
            </NavItem>
          </Nav>
          {/* {isToken !== null ? (
            <>
              <NavbarText tag={Link} to="">
                {userId} 님 환영해~
              </NavbarText>
              <NavbarText tag={Link} to="/register">
                로그아웃
              </NavbarText>
            </>
          ) : (
            <>
              <NavbarText tag={Link} to="/login">
                Login
              </NavbarText>
              <NavbarText tag={Link} to="/register">
                Register
              </NavbarText>
            </>
          )} */}
        </Collapse>
      </Navbar>

      <main>
        <div style={{ margin: "0 20vw 0 20vw" }}>{children}</div>
      </main>
      <footer>
        <div style={{ margin: "0 20vw 0 20vw" }}>
          <p>Copyright © Igo Corp. All Rights Reserved.</p>
          <p> Team I go </p>
          <p>
            Address : 서울특별시 동작구 상도동 상도로 369 숭실대학교 정보과학관
          </p>
        </div>
      </footer>
    </>
  );
}
