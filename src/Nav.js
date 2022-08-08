import React, { useState, useEffect } from "react";
import "./Nav.css";
function Nav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const addBlackNav = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    };
    window.addEventListener("scroll", addBlackNav);

    return () => {
      window.removeEventListener("scroll", addBlackNav);
    };
  });

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className='nav__logo'
        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
        alt='Netflix Logo'
      />
      <img
        className='nav__avatar'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
        alt='Netflix Avatar'
      />
    </div>
  );
}

export default Nav;
