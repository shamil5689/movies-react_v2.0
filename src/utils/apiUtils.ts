import axios from "axios";

export const instanse = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech/api/",
  headers: {
    // d8df10cd-d4ed-4054-948a-30fbf61baf75
    // c9f1adeb-cd82-42ba-bdd8-b745197f9045
    "X-API-KEY": "c9f1adeb-cd82-42ba-bdd8-b745197f9045",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

export const moviesAPI = {
  getMoviesReleases(page: string) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate
      .toLocaleString("en-US", { month: "long" })
      .toUpperCase();
    return instanse.get(
      `v2.1/films/releases?year=${year}&month=${month}&${page}`
    );
  },
  getTopPopular(page: string) {
    return instanse.get(
      `v2.2/films/collections?type=TOP_POPULAR_MOVIES&${page}`
    );
  },
  getTopBest(page: string) {
    return instanse.get(`v2.2/films/collections?type=TOP_250_MOVIES&${page}`);
  },
  getFamilyMovies(page: string) {
    return instanse.get(`v2.2/films/collections?type=FAMILY&${page}`);
  },
  getComicsMovies(page: string) {
    return instanse.get(`v2.2/films/collections?type=COMICS_THEME&${page}`);
  },
  getMoviesId(id: string) {
    return instanse.get(`v2.2/films/${id}`);
  },
  getFactsId(id: string) {
    return instanse.get(`v2.2/films/${id}/facts`);
  },
  getSimilarsId(id: string) {
    return instanse.get(`v2.2/films/${id}/similars`);
  },
  getSearchMovies(search: string) {
    return instanse.get(`v2.1/films/${search}`);
  },
};
