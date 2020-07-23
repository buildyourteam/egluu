import React, { useState } from "react";
import { Link } from "react-router-dom";
import menu_bar from "./icon/menubar_hamburger.png";
import close_bar from "./icon/menubar_close.png";
import { useMove } from "../hook";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutAuth } from "../hook/auth/useLogin";
import { setToken } from "../reducers/login";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button
} from "reactstrap";

import "./component.css";

export default function Layout({ children }) {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.login.userId);
  const isToken = useSelector(state => state.login.isToken);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleClick = () => {
    window.sessionStorage.removeItem("id");
    window.sessionStorage.removeItem("accessToken");

    const reduxData = {
      isToken: false,
      userId: null
    };

    dispatch(setToken(reduxData));
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
            {isToken ? (
              <>
                <NavItem>
                  <NavLink tag={Link} to="/people">
                    {userId} 님 환영해~
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Button onClick={handleClick}>로그아웃</Button>
                </NavItem>
              </>
            ) : (
                <>
                  <NavItem>
                    <NavLink tag={Link} to="/login">
                      Login
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/register">
                      Register
                  </NavLink>
                  </NavItem>
                </>
              )}
          </Nav>
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
