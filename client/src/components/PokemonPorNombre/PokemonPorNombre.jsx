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
    return <div key="divBN">
        <form key="formBN" onSubmit={(e) => {                        
            e.preventDefault();
            if(pokeName.buscar){
                dispatch(getPokemonByName(pokeName.buscar.toLowerCase(),pokemons))
            }            
            }}>
            <span key="spanBN" className='buSpanPn'>Por Nombre</span>
            <input key="inputBN" type='search' id="buscar" onChange={(e) => handleChange(e)} />
            <input key="buttonInpBN" type="submit" value={`Buscar`} />
        </form>
    </div>
}