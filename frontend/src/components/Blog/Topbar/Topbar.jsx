import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";
import { ChatState } from "../../../Context/ChatProvider";
import ProfileModal from "../../Chat/miscellaneous/ProfileModal";

import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, ChevronDownIcon, EditIcon } from "@chakra-ui/icons";

export default function Topbar() {
  const { user } = ChatState();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        {window.location.pathname === "/blogpage" ? (
          <Tooltip label="Create a blog" hasArrow placement="bottom-end">
            <Link className="link" to="/write">
              Write <EditIcon />
            </Link>
          </Tooltip>
        ) : (
          <Tooltip label="Go to Home" hasArrow placement="bottom-end">
            <Link className="link" to="/blogpage">
              Home <ArrowBackIcon />
            </Link>
          </Tooltip>
        )}

        <Menu>
          <MenuButton _hover={{ bg: "gray.400" }} borderRadius="md">
            <Text fontSize="2xl" fontFamily="Work sans">
              JCinsights
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link className="link" to="/">
                JCEducation
              </Link>
            </MenuItem>
            <MenuItem>
              <Link className="link" to="/chatpage">
                JChat
              </Link>
            </MenuItem>
            <MenuItem>
              <Link className="link" to="/Live">
                JClass
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>

        <div>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>

            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
}
