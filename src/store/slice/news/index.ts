import { red } from "@mui/material/colors";
import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { getNews } from "../../thunks/news";

const initialState: any = {
  news: [],
};
export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
  },
});

export default newsSlice.reducer;
