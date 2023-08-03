import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets } from "../../store/thunks/assets";
import { Grid, Box, useTheme } from "@mui/material";
import styled from "./styles.module.css";
import { tokens } from "../../theme";
import AreaChart from "../../components/charts/area-chart";
import TrendUp from "../../assets/images/chart/trend-up.svg";
import TrendDown from "../../assets/images/chart/trend-down.svg";
import { LineChart } from "../../components/charts/line-chart";
import { IChartData, ISingleAsset } from "../../common/types/assets";

const Home: FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const favoriteAssets: IChartData[] = useAppSelector(
    (state) => state.assets.favoriteAssets
  );
  const dispatch = useAppDispatch();

  const fetchDataRef = useRef(false);

  const favoriteAssetName = useMemo(() => ["bitcoin", "ethereum"], []);
  const filteredArray = favoriteAssets.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name)
  );

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
  }, [favoriteAssetName, fetchData]);

  const renderFavoriteBlock = filteredArray.map((element: IChartData) => {
    console.log("Element", element);

    let currentPrice = 0;
    let changePrice = 0;
    element.singleAsset.forEach((element: ISingleAsset) => {
      currentPrice = element.current_price
      changePrice = element.price_change_percentage_24h
    });

    return (
      <Grid item lg={6} sm={6} xs={12} key={element.name}>
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
          <Grid item lg={6} sm={6} xs={12}>
            <h3 className={styled.assetName}>{element.name}</h3>
            <div className={styled.itemDetails}>
              <h3 className={styled.cardPrice}>${currentPrice}</h3>
              <Box
                className={
                  changePrice > 0
                    ? `${styled.cardTrend} ${styled.trendUp}`
                    : `${styled.cardTrend} ${styled.trendDown}`
                }
                sx={{ color: colors.secondary.DEFAULT }}
              >
                {changePrice > 0 ? (
                  <img src={TrendUp} alt="TrendUp" />
                ) : (
                  <img src={TrendDown} alt="TrendDown" />
                )}
                <span>{Number(changePrice).toFixed(1)} %</span>
              </Box>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
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
        <Grid item lg={12} sm={12} xs={12}>
          {filteredArray.length && <LineChart data={filteredArray} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
