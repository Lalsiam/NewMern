import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {


  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const [comments, setComments] = useState([]);

  const handleComment= async(desc, videoId)=>{
    const res = await axios.post("/api/comments", {desc, videoId});
    res.status === 200 && console.log("hello done")
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  return (
    <Container>
      <form onSubmit={(e)=>{
        e.preventDefault()
        
        handleComment(e.target[0].value,currentVideo._id )
        window.location.reload(true);
        

      }}>
      <NewComment>
        <Avatar src={currentUser.pic} />
        <Input placeholder="Add a comment..." />  {/* add comment here */}
      </NewComment>
      </form>
      {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;
