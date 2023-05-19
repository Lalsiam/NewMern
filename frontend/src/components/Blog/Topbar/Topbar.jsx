import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";
import { ChatState } from "../../../Context/ChatProvider";
import { Avatar, Menu, MenuItem, MenuList } from "@mui/material";
import { MenuButton, MenuDivider, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "../../Chat/miscellaneous/ProfileModal";

export default function Topbar() {
  const { user } = ChatState();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="top">
      <div className="topLeft">JBLOG</div>

      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/blogpage">
              HOME
            </Link>
          </li>
          <Link to="">
            <li className="topListItem">ABOUT</li>
          </Link>

          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>

          <li className="topListItem" onClick={logoutHandler}>
            LOGOUT
          </li>
        </ul>
      </div>

      <div className="topRight">
        <Link className="link" to="">
          <img className="topImg" src={user.pic} alt="" />
        </Link>

        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
