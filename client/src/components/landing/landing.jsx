import React from 'react';
import { NavLink } from 'react-router-dom';

export default function landing() {
    return (
        <div className="landing" > 
            <img  src="https://fontmeme.com/images/Pokemon-Logo.jpg" alt='Pokemon' />
            <h3><NavLink exact to="/pokemons" >Inicio</NavLink></h3>            
        </div>
    )
}