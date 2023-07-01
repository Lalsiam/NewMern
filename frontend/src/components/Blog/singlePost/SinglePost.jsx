import { Link, useLocation, useNavigate } from "react-router-dom";
import "./singlePost.css";
import Topbar from "../Topbar/Topbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../../../Context/ChatProvider";
import Sidebar from "../Sidebar/Sidebar";
import { Img } from "@chakra-ui/react";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [post, setPost] = useState({});

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const { user } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/blogposts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.content);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blogposts/${post._id}`, {
        data: { name: user.name },
      });
      navigate("/blogpage");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/blogposts/${post._id}`, {
        name: user.name,
        title,
        content: desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <>
      <div className="singlePost">
        <Topbar />
        <div className="singlePostWrapper">
          <Img src={post.pic} />

          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}
              {post.name === user?.name && (
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h1>
          )}

          <div className="singlePostInfo">
            <span>
              Author:
              <b className="singlePostAuthor">
                <Link to={`/blogpage/?user=${post.name}`} className="link">
                  {post.name}
                </Link>
              </b>
            </span>
            <span>Created: {new Date(post.createdAt).toDateString()}</span>
            <span>Edited: {new Date(post.updatedAt).toDateString()}</span>
          </div>

          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          )}
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
        <Sidebar />
      </div>
    </>
  );
}
