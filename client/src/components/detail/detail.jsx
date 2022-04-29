import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getPokemonByName} from '../../actions/actions'
import './detail.css'

export function Detail(){
    const [pokeName, setPokeName] = useState({});
    const {pokemonsLoaded:pokemons,pokemonDetail:pokeDetail} = useSelector(state=>state)
    const dispatch = useDispatch()
    function handleChange(e){
        setPokeName({[e.target.id]: e.target.value})
    }
    if(pokeDetail.nombre){
        return (
            <div key="general" className='general'>
                <div key="divBuscar" className='divBuscar'>
                    
                    <div key="divSolimg" className='divSolimg'>
                        <img key="img" className='imgdetail' src={pokeDetail.imagen} alt='PokeDetail'/>
                    </div>                    
                </div>                
                <div key="divDatos" className='divDatos'>
                    <span key="spanDatos" className='spanDatos'>Datos del Pokemon</span>
                    <div key="divDatosU" className='divDatosU'>
                        <div key="nombre">{`Nombre: ${pokeDetail.nombre}`}</div>
                        <div key="tipoeti">{`Tipo: `}</div>
                        <div key="tipomap">{pokeDetail.tipos && pokeDetail.tipos.map(p=><div>{p}</div>)}</div>
                        <div key="id">{`ID: ${pokeDetail.id}`}</div>
                        <div key="altura" >{`Altura: ${pokeDetail.altura}`}</div>
                        <div key="peso" >{`Peso: ${pokeDetail.peso}`}</div>
                    </div>
                    <span key="spanEstadis" className='spanDatos'>Estadisticas</span>
                    <div key="divEstadis" className='divEstadis'>
                        <div key="vida" >{`Vida: ${pokeDetail.estadisticas.vida}`}</div>
                        <div key="fuerza" >{`Fuerza: ${pokeDetail.estadisticas.fuerza}`}</div>
                        <div key="defenza" >{`Defenza: ${pokeDetail.estadisticas.defenza}`}</div>
                        <div key="velocidad" >{`Velocidad: ${pokeDetail.estadisticas.velocidad}`}</div>
                    </div>
                </div>                
            </div>
        )
    }else{
        return <div>
            <form onSubmit={(e) => {                        
                    e.preventDefault();
                    dispatch(getPokemonByName(pokeName.buscar,pokemons))
                    }}>
                    <span key="spTitu" className='buSpan'>ByName...</span>
                    <input key="inpBusca" type='search' id="buscar" onChange={(e) => handleChange(e)} />
                    <input key="inpSubm" type="submit" value={`Buscar`} />
            </form>
        </div>
    }
    
}