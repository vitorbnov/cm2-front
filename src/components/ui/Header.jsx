import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import './Header.scss'

export default ({ menus }) => (
  <header className="header">
    <Nav>
      { menus.map(({ label, url }, index) =>
        <NavItem key={index}>
          <NavLink href={url}>{label}</NavLink>
        </NavItem>
      )}
    </Nav>
  </header>
)
