import {getPokemonByName} from '../../actions/actions'
import React,{useState}  from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

import './NavBar.css';



export default function NavBar() {
    const [pokeName, setPokeName] = useState("");
    const pokemons = useSelector(state=>state.pokemonsLoaded)
    const dispatch = useDispatch()
    function handleChange(e){
        setPokeName(e.target.value)
    }
    return (
        <header className="navbar">
            <div>
                <img id="logoPokemon" src='https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png' width="30" height="30" className="logo" alt="" />
            </div>
            <div>
                <label>                    
                    <form onSubmit={(e) => {                        
                        e.preventDefault();
                        dispatch(getPokemonByName(pokeName,pokemons))
                        }}>
                        <span className='buSpan'>Busqueda...</span>
                        <input type='search' id="buscar" onChange={(e) => handleChange(e)} />
                        <input type="submit" value={`Buscar`} />
                    </form>
                </label>
            </div>
            <nav>                
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/" >Home</NavLink>
                        <NavLink exact to="/pokemons" >Pokemons</NavLink>
                        <NavLink exact to="/pokemons/detail" >Poke Detail</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}