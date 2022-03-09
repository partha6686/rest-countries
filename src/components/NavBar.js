import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

function NavBar(props) {
  const handleClick = () => {
    if (props.theme === "light") {
      props.setTheme("dark");
    } else {
      props.setTheme("light");
    }
  };
  return (
    <div
      className={props.theme === "light" ? "nav-bar" : "nav-bar nav-bar-dark"}
    >
      <a href="/">
        <h1>Where in the world?</h1>
      </a>
      <p onClick={handleClick}>
        <FontAwesomeIcon icon={faMoon} /> Dark Mode
      </p>
    </div>
  );
}
export default NavBar;
