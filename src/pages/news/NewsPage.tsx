import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getNews } from "../../store/thunks/news";
import { Box, Grid, Link, Typography, useTheme } from "@mui/material";
import styled from "./styles.module.css";
import { tokens } from "../../theme";
import InfiniteScroll from "react-infinite-scroll-component";

export const NewsPage: FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newsItem, setNewsItem] = useState([]);
  const dispatch = useAppDispatch();
  const { news } = useAppSelector((state) => state.news);
  const [assetsSlice, setAssetsSlice] = useState(10);
  const [isHasMore, setIsHasMore] = useState(true);

  const newsItemHeight = () => {
    if (assetsSlice < 60) {
      setTimeout(() => {
        setAssetsSlice(assetsSlice + 10);
        setNewsItem(news.slice(0, assetsSlice));
        console.log(assetsSlice);
      }, 1500);
    } else {
      setIsHasMore(false);
    }
  };

  useLayoutEffect(() => {
    setNewsItem(news.slice(0, assetsSlice));
  }, []);

  const InfinityScroll: FC = (): JSX.Element => {
    return (
      <InfiniteScroll
        dataLength={newsItem.length} //This is important field to render the next data
        next={newsItemHeight}
        scrollThreshold={0.99}
        hasMore={isHasMore}
        loader={<h4>Завантаження...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Це були останні новини дня</b>
          </p>
        }
      >
        {renderNewsBlock}
      </InfiniteScroll>
    );
  };
  const renderNewsBlock = newsItem.map((element: any) => (
    <Grid
      container
      className={styled.newsBlock}
      sx={{
        backgroundColor: `${
          theme.palette.mode === "light"
            ? colors.primary.DEFAULT
            : colors.primary[600]
        }`,
        border: `1px solid ${colors.borderColor}`,
        "& .MuiPaper-root": {
          backgroundColor: "transparent !important",
          boxShadow: "none !important",
          backgroundImage: "none !important",
        },
      }}
    >
      <Grid item xs={12} md={3}>
        <img src={element.imageurl} alt={element.category} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box className={styled.newsTitle}>
          <Typography variant="h3">{element.title}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{element.body}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={12} className={styled.readMore}>
        <Typography variant="h4">
          <Link href={element.url}>Читати далі...</Link>
        </Typography>
      </Grid>
    </Grid>
  ));
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);
  return (
    <Grid
      className={styled.root}
      sx={{
        "& a": {
          textDecoration: "none",
          color: `${
            theme.palette.mode === "light"
              ? colors.black.DEFAULT
              : colors.white.DEFAULT
          }`,
        },
      }}
    >
      <Grid className={styled.blockTitle}>
        <Typography variant="h2">Новини</Typography>
      </Grid>
      <Grid>
        <InfinityScroll />
      </Grid>
    </Grid>
  );
};
export default NewsPage;
