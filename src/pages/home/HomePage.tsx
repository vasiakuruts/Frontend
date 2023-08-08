import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets, getTopPriceData } from "../../store/thunks/assets";
import { Grid, Box, useTheme, Typography } from "@mui/material";
import styled from "./styles.module.css";
import { tokens } from "../../theme";
import AreaChart from "../../components/charts/area-chart/AreaChartComponent";
import TrendUp from "../../assets/images/chart/trend-up.svg";
import TrendDown from "../../assets/images/chart/trend-down.svg";
import { LineChartComponent } from "../../components/charts/line-chart/LineChartComponent";
import { IChartData, ISingleAsset } from "../../common/types/assets";
import TopPriceComponent from "../../components/top-prace/TopPriceComponent";

export const HomePage: FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const favoriteAssets: IChartData[] = useAppSelector(
    (state) => state.assets.favoriteAssets
  );
  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.assets.assets
  );
  const dispatch = useAppDispatch();

  const fetchDataRef = useRef(false);

  const favoriteAssetName = useMemo(() => ["bitcoin", "ethereum"], []);
  const filteredArray = useMemo(() => {
    return favoriteAssets.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
  }, [favoriteAssets]);

  const filteredAssetsArray = assetsArray
    .slice()
    .sort((a, b) => b.current_price - a.current_price);

  const fetchData = useCallback(
    (data: string[]) => {
      data.forEach((element: string) => {
        dispatch(getFavoriteAssets(element));
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (fetchDataRef.current) return;
    fetchDataRef.current = true;
    fetchData(favoriteAssetName);
    dispatch(getTopPriceData());
  }, [favoriteAssetName, fetchData, dispatch]);

  const renderFavoriteBlock = filteredArray.map((element: IChartData) => {
    let currentPrice = 0;
    let changePrice = 0;
    element.singleAsset.forEach((element: ISingleAsset) => {
      currentPrice = element.current_price;
      changePrice = element.price_change_percentage_24h;
    });

    return (
      <Grid item xs={12} sm={6} lg={6} key={element.name}>
        <Grid
          container
          className={styled.topCardItem}
          sx={{
            backgroundColor:
              theme.palette.mode === "light"
                ? colors.primary.DEFAULT
                : colors.primary[600],
            border: `1px solid ${colors.borderColor}`,
          }}
        >
          <Grid item xs={12} sm={6} lg={6}>
            <h3 className={styled.assetName}>{element.name}</h3>
            <div className={styled.itemDetails}>
              <h3 className={styled.cardPrice}>${currentPrice}</h3>
              <Box
                className={
                  changePrice > 0
                    ? `${styled.priceTrend} ${styled.trendUp}`
                    : `${styled.priceTrend} ${styled.trendDown}`
                }
                sx={{ color: colors.secondary.DEFAULT }}
              >
                {changePrice > 0 ? (
                  <img src={TrendUp} alt="TrendUp" />
                ) : (
                  <img src={TrendDown} alt="TrendDown" />
                )}
                <Typography variant="body1">
                  {Number(changePrice).toFixed(2)}%
                </Typography>
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <AreaChart data={element.price_chart_data} />
          </Grid>
        </Grid>
      </Grid>
    );
  });
  return (
    <Box className={styled.root}>
      <Grid container spacing={2} className={styled.areaChart}>
        {renderFavoriteBlock}
      </Grid>
      <Grid
        container
        className={styled.lineChartBlock}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? colors.primary.DEFAULT
              : colors.primary[600],
          border: `1px solid ${colors.borderColor}`,
        }}
      >
        <Grid item xs={12} sm={12} lg={12}>
          {filteredArray.length && <LineChartComponent data={filteredArray} />}
        </Grid>
      </Grid>
      <Grid
        container
        className={styled.topPriceRoot}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? colors.primary.DEFAULT
              : colors.primary[600],
          border: `1px solid ${colors.borderColor}`,
          "& .MuiPaper-root": {
            backgroundColor: "transparent !important",
            boxShadow: "none !important",
            backgroundImage: "none !important",
          },
        }}
      >
        <Grid item xs={12} sm={12} lg={12}>
          {filteredAssetsArray.length && (
            <TopPriceComponent assets={filteredAssetsArray.slice(0, 6)} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default HomePage;
