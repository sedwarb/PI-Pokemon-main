import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {createPokemons} from "../../actions/actions"


export function CrearPokemon(){
  const [datos, setPagina] = useState({});
  const dispatch = useDispatch()
  function handleChange(e){
    setPagina({...datos,[e.target.id]:e.target.value})
  }
  function creaObj(){
    let tipo=[datos.tipo]
    return {
      imagen:datos.imagen,
      nombre:datos.nombre,
      tipo:tipo,
      altura:datos.altura,
      peso:datos.peso,
      vida:datos.vida,
      fuerza:datos.fuerza,
      defenza:datos.defenza,
      velocidad:datos.velocidad
    }
  }
  return (
  <div>
    <form onSubmit={(e) => {
        e.preventDefault();
        //console.log(JSON.stringify(creaObj()))
        dispatch(createPokemons(creaObj()))
      }}>
      <div>Datos del Pokemon</div>
      <br />
      <div>Imagen</div>
      <div><input type="text" id="imagen" onChange={(e) => handleChange(e)} /></div>
      <div>Nombre</div>
      <div><input type="text" id="nombre" onChange={(e) => handleChange(e)} /></div>
      <div>Tipo</div>
      <div><input type="text" id="tipo" onChange={(e) => handleChange(e)} /></div>
      <div>Altura</div>
      <div><input type="text" id="altura" onChange={(e) => handleChange(e)} /></div>
      <div>Peso</div>
      <div><input type="text" id="peso" onChange={(e) => handleChange(e)} /></div>
      <br />
      <div>Estadisticas</div>
      <br />
      <div>Vida</div>
      <div><input type="text" id="vida" onChange={(e) => handleChange(e)} /></div>
      <div>Fuerza</div>
      <div><input type="text" id="fuerza" onChange={(e) => handleChange(e)} /></div>
      <div>Defenza</div>
      <div><input type="text" id="defenza" onChange={(e) => handleChange(e)} /></div>
      <div>Velocidad</div>
      <div><input type="text" id="velocidad" onChange={(e) => handleChange(e)} /></div>
      <br />
      <div><input type="submit" value="Enviar"/></div>
    </form>
  </div>
  )
}