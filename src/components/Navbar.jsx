import React from 'react';
import style from '../styles/Navbar.module.css'


const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.navbarTitle}>
        <h1>Chat PDF</h1>
      </div>
      <div className={style.navbarAbout}>
        <a href="https://github.com/HazSyl1">About Me</a>
      </div>
    </nav>
  );
};

export default Navbar;