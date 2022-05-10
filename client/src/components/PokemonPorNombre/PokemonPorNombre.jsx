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
    return <div key="74">
        <form key="75" onSubmit={(e) => {                        
            e.preventDefault();
            if(pokeName.buscar){
                dispatch(getPokemonByName(pokeName.buscar.toLowerCase(),pokemons))
            }            
            }}>
            <span key="76" className='buSpanPn'>Por Nombre</span>
            <input key="77" type='search' id="buscar" onChange={(e) => handleChange(e)} />
            <input key="78" type="submit" value={`Buscar`} />
        </form>
    </div>
}