import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getPokemonByName} from '../../actions/actions'

export function Detail(){
    const [pokeName, setPokeName] = useState({});
    const pokemons = useSelector(state=>state.pokemonsLoaded)
    const dispatch = useDispatch()
    function handleChange(e){
        setPokeName({[e.target.id]: e.target.value})
    }
    const pokeDetail = useSelector(state=>state.pokemonDetail)

    if(pokeDetail.nombre){
        return (
            <div>
                <form onSubmit={(e) => {                        
                    e.preventDefault();
                    dispatch(getPokemonByName(pokeName.buscar,pokemons))
                    }}>
                    <span className='buSpan'>ByName...</span>
                    <input type='search' id="buscar" onChange={(e) => handleChange(e)} />
                    <input type="submit" value={`Buscar`} />
                </form>
                <div>
                    <img key="img" src={pokeDetail.imagen} alt='PokeDetail'/>
                    <div key="nombre">{`Nombre: ${pokeDetail.nombre}`}</div>
                    <div key="tipoeti">{`Tipo: `}</div>
                    <div key="tipomap">{pokeDetail.tipos && pokeDetail.tipos.map(p=><div>{p}</div>)}</div>
                    <div key="id">{`ID: ${pokeDetail.id}`}</div>
                    <div key="estadis" >{`Estadisticas: `}</div>
                    <div key="vida" >{`Vida: ${pokeDetail.estadisticas.vida}`}</div>
                    <div key="fuerza" >{`Fuerza: ${pokeDetail.estadisticas.fuerza}`}</div>
                    <div key="defenza" >{`Defenza: ${pokeDetail.estadisticas.defenza}`}</div>
                    <div key="velocidad" >{`Velocidad: ${pokeDetail.estadisticas.velocidad}`}</div>
                    <div key="altura" >{`Altura: ${pokeDetail.altura}`}</div>
                    <div key="peso" >{`Peso: ${pokeDetail.peso}`}</div>
                </div>
                
            </div>
        )
    }else{
        return <div>
            <form onSubmit={(e) => {                        
                    e.preventDefault();
                    dispatch(getPokemonByName(pokeName.buscar,pokemons))
                    }}>
                    <span className='buSpan'>ByName...</span>
                    <input type='search' id="buscar" onChange={(e) => handleChange(e)} />
                    <input type="submit" value={`Buscar`} />
            </form>
        </div>
    }
    
}