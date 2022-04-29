import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux'
import {getPokemonByName} from '../../actions/actions'


export default function PokemonPorNombre(){
    const [pokeName, setPokeName] = useState({});
    const pokemons = useSelector(state=>state.pokemonsLoaded)
    const dispatch = useDispatch()
    function handleChange(e){
        setPokeName({[e.target.id]: e.target.value})
    }
    return <div>
        <form onSubmit={(e) => {                        
            e.preventDefault();
            dispatch(getPokemonByName(pokeName.buscar.toLowerCase(),pokemons))
            }}>
            <span className='buSpanPn'>Por Nombre</span>
            <input type='search' id="buscar" onChange={(e) => handleChange(e)} />
            <input type="submit" value={`Buscar`} />
        </form>
    </div>
}