import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
                <img id="logoPokemon" src='https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png' width="30" height="30" className="logo" alt="" />
            </div>
            <div>
                <label>
                    <span className='buSpan'>Busqueda...</span>
                    <input type='search' id="buscar"/>
                </label>
            </div>
            <nav>
                
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/" >Home</NavLink>
                        <NavLink exact to="/pokemons" >Pokemons</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}