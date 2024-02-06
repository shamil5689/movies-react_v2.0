import { useLocation, useSearchParams } from "react-router-dom";

const NotFound = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  return (
    <>
      <h1 className="flex align-center justify-center p-52 text-white">
        {`Извините, по вашему запросу "`}
        <span className="error__search-query">{`${
          searchParams.get("search") || location.pathname
        }`}</span>
        {`" ничего не найдено...`}
      </h1>
    </>
  );
};

export default NotFound;
