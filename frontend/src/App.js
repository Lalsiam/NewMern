import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Home from "./Pages/Home";
import Video from "./Pages/Video";
import Search from "./Pages/Search";
import Chatpage from "./Pages/Chatpage";
import Blogpage from "./Pages/BlogFolder/Bloghome/Bloghome";
import Single from "./Pages/BlogFolder/Single/Single";
import Write from "./Pages/BlogFolder/Write/Write";

import Live from "./Pages/Live/LiveHome";
import Room from "./Pages/Live/Room";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Homepage />} />

      <Route path="/">
        <Route index element={<Home type="random" />} />
        <Route path="trends" element={<Home type="trend" />} />
        <Route path="subscriptions" element={<Home type="sub" />} />
        <Route path="search" element={<Search />} />

        <Route path="video">
          <Route path=":id" element={<Video />} />
        </Route>
        <Route path="/chatpage" element={<Chatpage />} />
        <Route path="/blogpage" element={<Blogpage />} />

        <Route path="/write" element={<Write />} />

        <Route path="/post/:postId" element={<Single />} />
        <Route path="/Live" element={<Live />} />
        <Route path="/room/:roomID" element={<Room />} />
      </Route>
    </Routes>
  );
}

export default App;
