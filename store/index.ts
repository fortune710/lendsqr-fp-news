import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsItem } from "../types";

interface NewsState {
  news: NewsItem[];
}

const initialState: NewsState = {
  news: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    storeNews: (state, action: PayloadAction<NewsItem[]>) => {
      state.news = action.payload;
    },
  },
});

export const selectNewsByTitle = (state: any, title: string) =>
  state.news.news.find((news: NewsItem) => news.title === title);

export const { storeNews } = newsSlice.actions;

const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
  },
});

export default store;