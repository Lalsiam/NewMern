import { ChatState } from "../../../Context/ChatProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../../../Editor";
import axios from "axios";
import "./write.css";
import { v4 } from "uuid";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  listAll,
} from "firebase/storage";

import app from "../../../firebase";

export default function CreatePost() {
  const { user } = ChatState();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");

  const [imageUrls, setImageUrls] = useState([]);

  const uploadFile = () => {
    const storage = getStorage(app);

    if (img == null) return;
    const imageRef = ref(storage, `imagesBlog/${img.name + v4()}`);

    uploadBytes(imageRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(url);
      });
    });
  };

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const createNewPost = async (ev) => {
    ev.preventDefault();

    const newPost = {
      name: user.name,
      title,
      summary,
      content,
      profilepic: user.pic,
      pic: imageUrls,
    };

    try {
      const res = await axios.post("/api/blogposts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <form onSubmit={createNewPost}>
      <input
        className="ins"
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        className="ins"
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        className="ins"
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <Editor value={content} onChange={setContent} />
      <button className="bttn" style={{ marginTop: "5px" }}>
        Create post
      </button>
    </form>
  );
}
