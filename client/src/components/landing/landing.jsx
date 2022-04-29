import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getPokemons,tiposPokemon} from '../../actions/actions'
import './landing.css'

export default function Landing() {
    const pokemons = useSelector(state=>state.orden)
    const dispatch = useDispatch()
    const img = "https://25.media.tumblr.com/a1e87d2030a73aee16661e8807da6c1d/tumblr_mkhnmmFwaA1rxvkeso1_500.gif"
    const imgBola = "https://reygif.com/media/4/pokebola-54401.gif"
    
    useEffect(()=>{        
        dispatch(getPokemons())
        dispatch(tiposPokemon())
      },[pokemons])
    /*
      dispatch(tiposPokemon())
    */  
    //if(true){
    if(pokemons.length>0){
        return (
            <div className="landing" >                
                <div className='divBotonn'><button className='botonDDiv'><Link to="/pokemons" >Inicio</Link></button></div>
                <br />
                <div className='divimagen'><img className='imagen' src={img} alt='Pokemon' /></div>
            </div>
        )
    }else{
        return (
            <div className="landing" >
                <div className='divBotonn'><span className='spanBotonn'>Cargado... Pokemons Por favor Espere</span></div>
                <br />
                <div className='divimagen'><img className='imagen' src={img} alt='Pokemon' /></div>
                <br />
                <div className='divBola'><img className='imagenBola' src={imgBola} alt='Pokebola' /></div>
            </div>
        )
    }
}