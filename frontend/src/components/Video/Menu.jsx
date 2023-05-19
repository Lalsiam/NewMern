import React from "react";
import styled from "styled-components";
import logo from "../../img/logo2.jpg";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";

import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import ArticleIcon from "@mui/icons-material/Article";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-item: center;
  gap: 10px;

  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 30px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid white;
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={logo} />
          </Logo>
        </Link>

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <OndemandVideoOutlinedIcon />
            Home
          </Item>
        </Link>

        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <AccessibilityIcon />
            Explore
          </Item>
        </Link>

        {currentUser ? (
          <>
            <Link
              to="/subscriptions"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <CastForEducationIcon />
                Enrolled
              </Item>
            </Link>
            <Hr />
            <Link
              to="/Live"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <SchoolIcon />
                Live
              </Item>
            </Link>
            <Link
              to="/chatpage"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <SendIcon />
                Ping
              </Item>
            </Link>

            <Link
              to="/blogpage"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <ArticleIcon />
                Blog
              </Item>
            </Link>
          </>
        ) : (
          <>
            <Hr />
            <Login>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  Login
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}

        <Hr />

        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Dark" : "Light"}
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
