import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISingleAsset } from "../../common/types/assets";
import { useAppSelector } from "../../utils/hook";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import styled from "./styles.module.css";

export const SingleAssetPage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.assets.assets
  );

  const asset = assetsArray.find((element) => element.name === (id as string));

  return (
    <div>
      <h1 onClick={() => navigate(-1)}>Go back</h1>
    </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: 20, fontWeight: 600, marginRight: 2 }}
            >
              Змітна ціни:
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 20 }}>
                $ {asset.price_change_24h}
              </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: 20, fontWeight: 600, marginRight: 2 }}
            >
              Змітна ціни в процентах:
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 20 }}>
                $ {asset.price_change_percentage_24h}
              </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SingleAssetPage;
