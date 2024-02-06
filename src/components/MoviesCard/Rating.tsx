import { FC } from "react";
import { useLocation } from "react-router-dom";

const Rating: FC<{ rating?: number }> = ({ rating }) => {
  const location = useLocation();
  const ratingColor = (rating: number | undefined) => {
    if (rating) {
      if (rating >= 8) {
        return `${
          location.pathname === "/" ? "gold rating " : "text-gold "
        } font-bold`;
      }
      if (rating >= 7) {
        return `${
          location.pathname === "/" ? "green rating" : "text-green"
        } font-bold `;
      }
      if (rating >= 6) {
        return `${
          location.pathname === "/" ? "orange rating" : "text-orange"
        } font-bold `;
      }
      if (rating < 6) {
        return `${
          location.pathname === "/" ? "red rating" : "text-red"
        }  font-bold`;
      }
    }
  };
  return <span className={`${ratingColor(rating)}`}>{rating}</span>;
};

export default Rating;
