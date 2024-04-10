import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-screen py-5 bg-Blue font-medium text-3xl text-white text-center block">
      <Link to={"/"}>Weather Dashboard</Link>
    </div>
  );
};

export default Header;
