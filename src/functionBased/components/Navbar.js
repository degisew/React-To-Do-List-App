/* eslint-disable */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const links = [
    {
      id: 1,
      path: '/',
      text: 'Home',
    },
    {
      id: 2,
      path: '/about',
      text: 'About',
    },
  ];
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  const closeMenu = () => {
    setNavbarOpen(false);
  };
  return (
    <nav className="navBar">
      <ul>
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className="active-link"
            onClick={() => closeMenu()}
            exact
          >
            {link.text}
          </NavLink>
        ))}
      </ul>
      <button onClick={handleToggle}>
        {navbarOpen ? (
          <MdClose style={{ color: '#fff', width: '40px', height: '40px' }} />
        ) : (
          <FiMenu style={{ color: '#7b7b7b', width: '40px', height: '40px' }} />
        )}
      </button>
      <ul className={`menuNav ${navbarOpen ? ' showMenu' : ''}`}>...</ul>
    </nav>
  );
}

export default Navbar;
