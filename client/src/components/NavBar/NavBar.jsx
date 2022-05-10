import React  from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {    
    return (
        <header key="nbhead1" className="navbar">
            <div key="nbdivppl2">
                <img key="nbimglogo3" id="logoPokemon" src='https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png' width="30" height="30" className="logo" alt="" />
            </div>            
            <nav key="nbnav4">                
                <ul key="nbul5" className="list">
                    <li key="nbli6" className="list-item">
                        <NavLink exact to="/" >Home</NavLink>
                        <NavLink exact to="/pokemons" >Pokemons</NavLink>
                        <NavLink exact to="/pokemons/create" >Crear Poke</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}