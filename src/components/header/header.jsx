import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './header.pcss';

const Header = () => {
  return (
    <div className={cn(styles.header)}>
      <Link to={"/about"}>About</Link>
      <Link to={"/"}>Home</Link>
      <Link to={"/settings"}>Settings</Link>
      <Link to={"/game"}>game</Link>
    </div>
  )
}

export default Header;