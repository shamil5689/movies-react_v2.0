import React from "react";
import { Link } from "react-router-dom";

export const EmptyFavorites: React.FC = () => (
  <div className="m-[0 auto] text-center p-52 text-white">
    <h2>
      Список избранных фильмов пуст <span>😕</span>
    </h2>
    <p>
      Добавьте фильмы в избранное,
      <br />
      чтобы они появились здесь
    </p>
    <Link to="/" className="button">
      <span>Вернуться назад</span>
    </Link>
  </div>
);
