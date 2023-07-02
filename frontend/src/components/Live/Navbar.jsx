import { Link, useNavigate } from "react-router-dom";

import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "../Chat/miscellaneous/ProfileModal";

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

export default function Navbar() {
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
        <Tooltip label="Go to Home" hasArrow placement="bottom-end">
          <Link className="link" to="/">
            Home
            <ArrowBackIcon />
          </Link>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          JCLive
        </Text>

        <div>
          <Avatar mr={3} size="sm" cursor="pointer" name={user.name} src={user.pic} />
        </div>
      </Box>
    </>
  );
}
