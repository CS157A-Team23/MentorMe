import React from "react";

const Header = props => {
  const { onSetPage } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        MentorMe
      </a>
      <div className="">
        <button
          className="text-center btn btn-outline-primary mx-2"
          onClick={() => onSetPage(0)}
        >
          Topics
        </button>
        <button
          className="text-center btn btn-outline-primary mx-2"
          onClick={() => onSetPage(1)}
        >
          Connects
        </button>
        <button
          className="text-center btn btn-outline-primary mx-2"
          onClick={() => onSetPage(2)}
        >
          Me
        </button>
      </div>
      <p className="ml-auto mt-2">{sessionStorage.getItem("firstname")}</p>
    </nav>
  );
};

export default Header;
