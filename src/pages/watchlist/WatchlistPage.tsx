import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getWatchlistElements } from "../../store/thunks/watchlist";
import { getTopPriceData } from "../../store/thunks/assets";
import { AssetsTableComponent } from "../../components/assets-table";
import { Grid, Typography, useTheme } from "@mui/material";
import styled from "./styles.module.css";
import { tokens } from "../../theme";

export const WatchlistPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useAppDispatch();
  const watchlist = useAppSelector((state) => state.watchlist.assets);
  const { assets } = useAppSelector((state) => state.assets);

  useEffect(() => {
    dispatch(getTopPriceData());
    dispatch(getWatchlistElements());
  }, [dispatch]);

  const filteredArray = assets.filter((element: any) => {
    return watchlist.some((otherElement: any) => {
      return otherElement.assetId === element.id;
    });
  });

  console.log(filteredArray);

  return (
    <Grid className={styled.root}>
      <Grid className={styled.watchlistHeading}>
        <Typography variant="h2" className={styled.heading}>
          Обране
        </Typography>
      </Grid>
      <Grid
        className={styled.assetsTableBlock}
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
        <AssetsTableComponent assets={filteredArray} />
      </Grid>
    </Grid>
  );
};
export default WatchlistPage;
