import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getPokemons,tiposPokemon} from '../../actions/actions'
import './landing.css'

export default function Landing() {
    const [inicio,setInicio] = useState(true)
    const pokemons = useSelector(state=>state.orden)
    const dispatch = useDispatch()
    const img = "https://25.media.tumblr.com/a1e87d2030a73aee16661e8807da6c1d/tumblr_mkhnmmFwaA1rxvkeso1_500.gif"
    const imgBola = "https://reygif.com/media/4/pokebola-54401.gif"
    
    if(inicio){
        dispatch(getPokemons())
        dispatch(tiposPokemon())
        setInicio(false)
    }
    
    if(pokemons.length>0){
        return (
            <div className="landing" key="1">                
                <div className='divBotonn' key="2"><button className='botonDDiv'><Link key="2p1" to="/pokemons" >Inicio</Link></button></div>
                <br />
                <div className='divimagen' key="3"><img key="4" className='imagen' src={img} alt='Pokemon' /></div>
            </div>
        )
    }else{
        return (
            <div className="landing" key="5">
                <div className='divBotonn' key="6"><span key="7" className='spanBotonn'>Cargando... Pokemons Por favor Espere</span></div>
                <br />
                <div className='divimagen' key="8"><img key="9" className='imagen' src={img} alt='Pokemon' /></div>
                <br />
                <div className='divBola' key="10"><img key="10p1" className='imagenBola' src={imgBola} alt='Pokebola' /></div>
            </div>
        )
    }
}