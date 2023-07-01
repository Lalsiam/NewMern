import { Link } from "react-router-dom";
import "./post.css";
import { Img } from "@chakra-ui/react";

export default function Post({ post }) {
  return (
    <>
      <Link to={`/post/${post._id}`} className="link">
        <div className="post">
          <Img src={post.pic} />

          <div className="postInfo">
            <Link to={`/post/${post._id}`} className="link">
              <span className="postTitle">{post.title}</span>
            </Link>

            <hr />
            <span className="postDate"> Author: {post.name}</span>

            <span className="postDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          <p className="postDesc">{post.summary}</p>
        </div>
      </Link>
    </>
  );
}
