import { Dispatch } from "@reduxjs/toolkit";

interface MyAction {
  type: string;
  payload: number;
}

export const handleSetCurrentPage = (
  currentPage: number,
  dispatch: Dispatch,
  dispatchAction: (arg: number) => MyAction,
  setButtonClicked: (value: boolean) => void
) => {
  dispatch(dispatchAction(currentPage));
  setButtonClicked(true);
};
