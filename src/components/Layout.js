import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
  Button,
} from "reactstrap";
import "./Layout.css";
import "./component.css";

export default function Layout({ children }) {
  const dispatch = useDispatch();

  // useMove 안 쓴 이유 -> 로그인 여부를 가지는 state가 레이아웃 컴포넌트 내부에 없어서 사용하기 애매함,,
  // 일단 직접 useHistory로 구현
  const history = useHistory();

  // 레이아웃 바에서 로그인 여부를 확인하고, 유저 아이디를 띄울 변수
  const userId = useSelector((state) => state.login.userId);
  const isToken = useSelector((state) => state.login.isToken);

  // 레이아웃에서 userId클릭하면 이동할 본인 프로필페이지 주소
  const profileUrl = `/profile/${userId}`;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // 로그아웃
  const handleClick = () => {
    // 세션 스토리지 비우기
    window.sessionStorage.removeItem("id");
    window.sessionStorage.removeItem("accessToken");
    window.sessionStorage.removeItem("refreshToken");

    // 리덕스 초기화 데이터
    const reduxData = {
      isToken: false,
      userId: null,
    };

    // 액션 디스패치
    dispatch(setToken(reduxData));

    // 홈으로
    history.push(`/`);
  };

  return (
    <>
      <Navbar color="" light expand="md" className="nav_header">
        <NavbarBrand tag={Link} to="/">
          Egluu
          {/* <img src={logo} alt="menubar" id="menu-img" width="100" /> */}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
              <NavLink tag={Link} to="/projects">
                프로젝트 목록보기
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/peoples">
                사용자 목록보기
              </NavLink>
            </NavItem>
            {isToken ? (
              <>
                <NavItem className="ml-auto">
                  <NavLink tag={Link} to={profileUrl}>
                    {userId} 님
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Button onClick={handleClick}>로그아웃</Button>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="ml-auto">
                  <NavLink tag={Link} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem className="nav-right">
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
        <div className="nav_body">{children}</div>
      </main>

      <footer className="nav_footer">
        <hr />
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h4 className="text-uppercase">Egluu</h4>
              <br />
              <p>Simple Team Building Platform</p> © 2020 Copyright:
              <a href="https://egluuapi.codingnome.dev/">
                https://egluuapi.codingnome.dev/
              </a>
            </div>
            <hr className="clearfix w-100 d-md-none pb-3" />
            <div className="col-md-2 mb-md-0 mb-2"></div>
            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Links</h5>
              <br />
              <ul className="list-unstyled">
                <li>
                  <a href="#!">Instagram</a>
                </li>
                <br />
                <li>
                  <a href="#!">Github</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
      </footer>
    </>
  );
}
