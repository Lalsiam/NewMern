import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { logout } from "../../redux/userSlice";
import Upload from "./Upload";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { BellIcon, ChevronDownIcon, ArrowRightIcon } from "@chakra-ui/icons";



import {
  Avatar,
 
  
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
 
} from "@chakra-ui/react";
import ProfileModal from "../Chat/miscellaneous/ProfileModal";



const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid white;
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left:5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

// const Avatar = styled.img`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   background-color: #999;
// `;

const Navbar = () => {
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
  localStorage.removeItem("userInfo");
  navigate("/login");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <>
              <User>
                <FileUploadOutlinedIcon onClick={() => setOpen(true)} />
              </User>
              
              <Menu>
                <MenuButton
                  as={Button}
                  bg="white"
                  rightIcon={<ChevronDownIcon />}
                >
                  <Avatar
                    size="sm"
                    cursor="pointer"
                    name={currentUser.name}
                    src={currentUser.pic}
                  />
                </MenuButton>

                <MenuList>
                  <ProfileModal user={currentUser}>
                    <MenuItem>My Profile</MenuItem>{" "}
                  </ProfileModal>

                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                Login
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
