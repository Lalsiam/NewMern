import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Comment from "../components/Video/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import Recommendation from "../components/Video/Recommendation";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../utils/Theme";
import Menu from "../components/Video/Menu";
import Navbar from "../components/Video/Navbar";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 2;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`);
        const channelRes = await axios.get(
          `/api/users/find/${videoRes.data.userId}`
        );

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.put(`/api/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/api/users/unsub/${channel._id}`)
      : await axios.put(`/api/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Content>
                <VideoWrapper>
                  <VideoFrame
                    src={currentVideo && currentVideo.videoUrl}
                    controls
                  />
                </VideoWrapper>
                <Title>{currentVideo && currentVideo.title}</Title>
                <Details>
                  <Info>{format(currentVideo && currentVideo.createdAt)}</Info>
                  <Buttons>
                    <Button onClick={handleLike}>
                      {currentVideo &&
                      currentVideo.likes?.includes(currentUser?._id) ? (
                        <FavoriteSharpIcon />
                      ) : (
                        <FavoriteBorderSharpIcon />
                      )}{" "}
                      {currentVideo && currentVideo.likes?.length}
                    </Button>
                    <Button onClick={handleDislike}>
                      {currentVideo &&
                      currentVideo.dislikes?.includes(currentUser?._id) ? (
                        <ThumbDownIcon />
                      ) : (
                        <ThumbDownOffAltOutlinedIcon />
                      )}{" "}
                      Dislike
                    </Button>
                  </Buttons>
                </Details>
                <Hr />
                <Channel>
                  <ChannelInfo>
                    <Image src={channel.pic} />
                    <ChannelDetail>
                      <ChannelName>{channel.name}</ChannelName>
                      <ChannelCounter>{channel.subscribers}</ChannelCounter>
                      <Description>
                        {currentVideo && currentVideo.desc}
                      </Description>
                    </ChannelDetail>
                  </ChannelInfo>
                  <Subscribe onClick={handleSub}>
                    {currentUser.subscribedUsers?.includes(channel._id)
                      ? "ENROLED"
                      : "ENROLL"}
                  </Subscribe>
                </Channel>
                <Hr />
                <Comment videoId={currentVideo && currentVideo._id} />
              </Content>
              <Recommendation tags={currentVideo && currentVideo.tags} />
            </Wrapper>
          </Main>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Video;
