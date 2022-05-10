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
            <div key="36" className='general'>
                <div key="37" className='divBuscar'>
                    
                    <div key="38" className='divSolimg'>
                        <img key="39" className='imgdetail' src={pokeDetail.imagen} alt='PokeDetail'/>
                    </div>                    
                </div>                
                <div key="40" className='divDatos'>
                    <span key="41" className='spanDatos'>Datos del Pokemon</span>
                    <div key="42" className='divDatosU'>
                        <div key="43">{`Nombre: ${pokeDetail.nombre}`}</div>
                        <div key="44">{`Tipo: `}</div>
                        <div key="45">{pokeDetail.tipos && pokeDetail.tipos.map((p,i)=><div key={`map46${i}`}>{p}</div>)}</div>
                        <div key="47">{`ID: ${pokeDetail.id}`}</div>
                        <div key="48" >{`Altura: ${pokeDetail.altura}`}</div>
                        <div key="49" >{`Peso: ${pokeDetail.peso}`}</div>
                    </div>
                    <span key="50" className='spanDatos'>Estadisticas</span>
                    <div key="51" className='divEstadis'>
                        <div key="52" >{`Vida: ${pokeDetail.estadisticas.vida}`}</div>
                        <div key="53" >{`Fuerza: ${pokeDetail.estadisticas.fuerza}`}</div>
                        <div key="54" >{`Defenza: ${pokeDetail.estadisticas.defenza}`}</div>
                        <div key="55" >{`Velocidad: ${pokeDetail.estadisticas.velocidad}`}</div>
                    </div>
                </div>                
            </div>
        )
    }else{
        return <div key="56">
            <form key="57" onSubmit={(e) => {                        
                    e.preventDefault();
                    dispatch(getPokemonByName(pokeName.buscar,pokemons))
                    }}>
                    <span key="58" className='buSpan'>ByName...</span>
                    <input key="59" type='search' id="buscar" onChange={(e) => handleChange(e)} />
                    <input key="60" type="submit" value={`Buscar`} />
            </form>
        </div>
    }
    
}