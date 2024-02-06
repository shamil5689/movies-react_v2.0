/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useRef, useState } from "react";
import searchWhite from "../../assets/img/search-white.svg";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { setSearchValue } from "src/redux/slices/searchMovieSlice";
import { useAppDispatch } from "src/redux/store";
import debounce from "lodash.debounce";
import { useSearchParams } from "react-router-dom";

const Search: FC = () => {
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const nodeRef = useRef<HTMLInputElement>(null);
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
    searchHandler(event);
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let search: any;
    if (event.target.value) {
      search = {
        keyword: event.target.value,
      };
    } else {
      search = undefined;
    }

    setSearchParams(search, { replace: true });
  };

  const updateSearchValue = useCallback(
    debounce((event: string) => {
      dispatch(setSearchValue(event));
    }, 1000),
    []
  );
  const onButtonClick = () => {
    setIsInputVisible(false);
  };

  useEffect(() => {
    isInputVisible === false && nodeRef.current?.focus();
  }, [isInputVisible]);

  return (
    <div className="search w-[147px] flex justify-end">
      {isInputVisible && (
        <button
          onClick={onButtonClick}
          className={`border-none bg-transparent cursor-pointer h-full`}
        >
          <img src={searchWhite} alt="search" />
        </button>
      )}
      <TransitionGroup>
        {!isInputVisible && (
          <CSSTransition
            key="search"
            nodeRef={nodeRef}
            in={isInputVisible}
            timeout={300}
            classNames={{
              enter: "fadeInRight-enter",
              enterActive: "fadeInRight-enter-active",
              exit: "fadeInRight-exit",
              exitActive: "fadeInRight-exit-active",
            }}
            unmountOnExit
          >
            <input
              ref={nodeRef}
              value={value}
              onChange={(event) => onChangeInput(event)}
              className="input font-garamond h-[25px] p-[8px] rounded-lg"
              type="text"
              placeholder="..."
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default Search;
