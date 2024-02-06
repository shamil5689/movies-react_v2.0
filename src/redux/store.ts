import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import moviesNewReleases from "./slices/moviesNewReleasesSlice";
import moviesTopPopular from "./slices/moviesTopPopularSlice";
import moviesTopBest from "./slices/moviesTopBestSlice";
import moviesFamily from "./slices/moviesFamilySlice";
import moviesComics from "./slices/moviesComicsSlice";
import filterMovies from "./slices/filterMoviesSlice";
import searchMovies from "./slices/searchMovieSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";

const rootReducer = combineReducers({
  moviesNewReleases,
  moviesTopPopular,
  moviesTopBest,
  moviesFamily,
  moviesComics,
  filterMovies,
  searchMovies,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "moviesNewReleases",
    "moviesTopPopular",
    "moviesTopBest",
    "moviesFamily",
    "moviesComics",
    "searchMovies",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
