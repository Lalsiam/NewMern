import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
const [cats, setCats] = useState([]);
const [post, setPost] = useState({});
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");

const location = useLocation();
const path = location.pathname.split("/")[2];

useEffect(() => {
  const getCats = async () => {
    const res = await axios.get("/api/blogpcat");
    setCats(res.data);
  };
  getCats();
}, []);


useEffect(() => {
  const getPost = async () => {
    const res = await axios.get("/api/blogposts/" + path);
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
  };
  getPost();
}, [path]);




  return (
  
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT AUTHOR</span>
        <img
          src={post.profilepic}
          alt=""
        />
        <p>
          {post.name}
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>

        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/blogpage/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
