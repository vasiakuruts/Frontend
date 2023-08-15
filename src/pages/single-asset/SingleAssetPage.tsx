import React, { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISingleAsset } from "../../common/types/assets";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import {
  Alert,
  AlertColor,
  Avatar,
  Box,
  Button,
  Grid,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import styled from "./styles.module.css";
import { tokens } from "../../theme";
import { createWatchListRecord } from "../../store/thunks/assets";

export const SingleAssetPage: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.assets.assets
  );
  const theTheme = {
    backgroundColor:
      theme.palette.mode === "light"
        ? colors.primary.DEFAULT
        : colors.primary[600],
    border: `1px solid ${colors.borderColor}`,
  };
  const asset = assetsArray.find((element) => element.name === (id as string));

  const hendleCreateRecord = () => {
    try {
      const data = {
        name: "",
        assetId: "",
      };
      if (asset) {
        data.name = asset.name;
        data.assetId = asset.id;
      }
      dispatch(createWatchListRecord(data));
      setError(false);
      setSeverity("success");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (e) {
      setError(true);
      setSeverity("error");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  };

  return (
    <>
      {asset && (
        <Grid container className={styled.root}>
          <Grid item xs={12} className={styled.assetName}>
            <Typography variant="h1" className={styled.name}>
              {asset.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={styled.card}>
            <Grid className={styled.cardItem} sx={theTheme}>
              <Box className={styled.flexBetween}>
                <Avatar src={asset.image} className={styled.assetIcon} />
                <Typography variant="h2" className={styled.assetSymbol}>
                  {asset.symbol.toUpperCase()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} className={styled.card}>
            <Grid className={styled.cardItem} sx={theTheme}>
              <Box className={styled.flexBetween}>
                <Typography variant="h2" className={styled.assetTitle}>
                  Ціна:
                </Typography>

                <Typography variant="h2" className={styled.assetPrice}>
                  $ {asset.current_price}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} className={styled.card}>
            <Grid container className={styled.cardItem} sx={theTheme}>
              <Typography variant="h2" className={styled.cardTitle}>
                Змітна ціни:&nbsp;
              </Typography>
              <Typography
                variant="h2"
                className={
                  asset.price_change_24h >= 0
                    ? `${styled.assetPriceDetail} ${styled.trendUp}`
                    : `${styled.assetPriceDetail} ${styled.trendDown}`
                }
              >
                $ {asset.price_change_24h.toFixed(4)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} className={styled.card}>
            <Grid className={styled.cardItem} sx={theTheme}>
              <Typography variant="h2" className={styled.cardTitle}>
                Змітна ціни в %:&nbsp;
              </Typography>
              <Typography
                variant="h2"
                className={
                  asset.price_change_percentage_24h >= 0
                    ? `${styled.assetPriceDetail} ${styled.trendUp}`
                    : `${styled.assetPriceDetail} ${styled.trendDown}`
                }
              >
                $ {asset.price_change_percentage_24h.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={styled.cardButtonBlock}>
            <Button
              color="success"
              variant="outlined"
              className={styled.button}
              onClick={() => navigate(-1)}
            >
              Назад
            </Button>
            <Button
              color="success"
              variant="outlined"
              className={styled.button}
              onClick={hendleCreateRecord}
            >
              Додати в обране
            </Button>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000}>
            <Alert severity={severity} sx={{ width: "100%" }}>
              {!error ? "Success!" : "Ooops"}
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </>
  );
};

export default SingleAssetPage;
