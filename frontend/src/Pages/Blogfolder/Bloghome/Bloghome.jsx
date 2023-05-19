import React, { useEffect, useState } from 'react'
import "./bloghome.css"
import Topbar from '../../../components/Blog/Topbar/Topbar'
import Header from '../../../components/Blog/Header/Header';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../../components/Blog/Sidebar/Sidebar';
import Posts from "../../../components/Blog/Posts/Posts"
import axios from "axios";

export default function Homepage() {

const [posts, setPosts] = useState([]);
const { search } = useLocation();

useEffect(() => {
  const fetchPosts = async () => {
    const res = await axios.get("/api/blogposts" + search);
    setPosts(res.data);
  };
  fetchPosts();
}, [search]);
 

  return (
    <>
      <Topbar />
      <Header />
      <div className="home">
        <Posts posts={posts} />
        
      </div>
    </>
  );
}