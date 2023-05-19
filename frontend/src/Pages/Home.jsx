import React from "react";
import styled from "styled-components";
import Card from "../components/Video/Card";
import { useState, useEffect } from "react";
import axios from "axios";

import Menu from "../components/Video/Menu";
import Navbar from "../components/Video/Navbar";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../utils/Theme";
import { useNavigate } from "react-router-dom";



const Contain = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Container = styled.div`
  display: flex;
  margin: 0 0;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

const Home= ({ type }) => {

 

const [darkMode, setDarkMode] = useState(true);
const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/videos/${type}`);
      setVideos(res.data); //data has all the random videos
    };
    fetchVideos();
  }, [type]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
          <Navbar />
          <Wrapper>
            <Contain>
              {videos.map((video) => (
                <Card key={video._id} video={video} />
              ))}
            </Contain>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
