import React from 'react';
import './index.css';
// @ts-ignore
import { NavLink } from 'react-router-dom';
interface Props {

}

export const Navbar: React.FC<Props> = () => {
    return (
        <div id='nav-container'>
            <NavLink to="/chart" activeClassName="nav-selected">Chart</NavLink>
            <NavLink to="/table" activeClassName="nav-selected">Table</NavLink>
            <NavLink to="/geo" activeClassName="nav-selected">Geo</NavLink>

        </div>);
}