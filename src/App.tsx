import { FC, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/";
import Favorites from "./pages/Favorites";
import MoviesDetails from "./components/MoviesDetails";
import NotFound from "./pages/Notfound";

const App: FC = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="movie/:id" element={<MoviesDetails />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
