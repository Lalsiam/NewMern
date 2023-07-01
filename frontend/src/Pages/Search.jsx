import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Video/Card";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../utils/Theme";
import Menu from "../components/Video/Menu";
import Navbar from "../components/Video/Navbar";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  const [darkMode, setDarkMode] = useState(true);

  const Main = styled.div`
    flex: 7;
    background-color: ${({ theme }) => theme.bg};
  `;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
          <Navbar />
          {videos.map((video) => (
            <Card key={video._id} video={video} />
          ))}
        </Main>
      </Container>
    </ThemeProvider>
  );
};

export default Search;
