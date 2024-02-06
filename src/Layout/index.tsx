import { FC } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="wrapper bg-black ">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
