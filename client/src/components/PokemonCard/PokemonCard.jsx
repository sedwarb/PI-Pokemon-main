import React from "react";
import { Link } from 'react-router-dom';

export default function PokemonCard({pokemon,indice,detalle}) {
    if(detalle==="na"){
        return <div key={`61${pokemon.nombre}`} className="allPokeCard">
        {
            <div key={`62${pokemon.nombre}`}>
                <img className='ipoke' src={pokemon.imagen} alt='Pokemon' key={`63${pokemon.nombre}`}/>
                <div key={`64${pokemon.nombre}`} className="PokeCardName">{pokemon.nombre.toUpperCase()}</div>                  
                <div key={`65${pokemon.nombre}`} className="PokeCardtype">{pokemon.tipos.map((t,j)=><div key={`map66${pokemon.nombre}${j}`} className="PokeCardtypeA">{upCaseFirstWord(t)}</div>)}</div>                  
            </div>
        }
        </div>
    }else{
        return <div key={`67${pokemon.nombre}`} className="allPokeCard">
        {
            <div key={`68${pokemon.nombre}`}>
                <img className='ipoke' src={pokemon.imagen} alt='Pokemon' key={`69${pokemon.nombre}`}/>
                <div className="PokeCardName" key={`70${pokemon.nombre}`}><Link key={`71${indice}`} to="/pokemons/detail" >{pokemon.nombre.toUpperCase()}</Link></div>                  
                <div className="PokeCardtype" key={`72${pokemon.nombre}`}>{pokemon.tipos.map((t,j)=><div className="PokeCardtypeA" key={`map73${pokemon.nombre}${j}`}>{upCaseFirstWord(t)}</div>)}</div>                  
            </div>
        }
        </div>
    }    
}
function upCaseFirstWord(word){
    return word.split('').map((e,i) => {
        if(i===0)return e.toUpperCase()
        else return e
    }).join('')
}