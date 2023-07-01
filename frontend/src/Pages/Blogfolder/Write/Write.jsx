import Topbar from "../../../components/Blog/Topbar/Topbar";
import "./write.css";
import { ChatState } from "../../../Context/ChatProvider";
import { useState } from "react";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("**Hello world!!!**");
  const [file, setFile] = useState(null);

  const { user } = ChatState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      name: user.name,
      title,
      desc,
      profilepic: user.pic,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/api/blogposts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <>
      <Topbar />
      <div className="write">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>

            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="writeFormGroup">
            <>
              <MDEditor value={desc} onChange={setDesc} />
              <MDEditor.Markdown
                source={desc}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </>
          </div>


          <button className="writeSubmit" type="submit">
            Publish
          </button>

        </form>
      </div>
    </>
  );
}
