import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
