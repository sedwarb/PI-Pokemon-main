import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {createPokemons,sTpos} from "../../actions/actions"
import ListaTipos from "../ListaTipos/ListaTipos"
import './CrearPokemon.css'

export function CrearPokemon(){
  const [datos, setDatos] = useState({init:"prueba"});
  const dispatch = useDispatch()
  const tipos = useSelector(state=>state.pokemonTypes)
  const tipoEnviar = useSelector(state=>state.tiposlist)
  function handleChange(e){
    setDatos({...datos,[e.target.id]:e.target.value})
  }
  function creaObj(){
    return {
      imagen:datos.imagen,
      nombre:datos.nombre,
      tipo:tipoEnviar,
      altura:datos.altura,
      peso:datos.peso,
      vida:datos.vida,
      fuerza:datos.fuerza,
      defenza:datos.defenza,
      velocidad:datos.velocidad
    }
  }
  function limpiar(){
    document.getElementById("imagen").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("vida").value = "";
    document.getElementById("fuerza").value = "";
    document.getElementById("defenza").value = "";
    document.getElementById("velocidad").value = "";
    dispatch(sTpos([]))
  }
  return (
  <div>
    <form onSubmit={(e) => {
        e.preventDefault();        
        dispatch(createPokemons(creaObj()))
        limpiar()
        alert(`Se ha creado el pokemon: ${datos.nombre}`)
      }}>
      <div key="tdatos" >Datos del Pokemon</div>
      <br />
      <div key="timagen" >Imagen</div>
      <div><input key="imagen" type="text" id="imagen" onChange={(e) => handleChange(e)} /></div>
      <div key="tnombre">Nombre</div>
      <div><input key="nombre" type="text" id="nombre" onChange={(e) => handleChange(e)} /></div>
      <div><ListaTipos lTipos={tipos}/></div>
      <div key="taltura">Altura</div>
      <div><input key="altura" type="text" id="altura" onChange={(e) => handleChange(e)} /></div>
      <div key="tpeso">Peso</div>
      <div><input key="peso" type="text" id="peso" onChange={(e) => handleChange(e)} /></div>
      <br />
      <div key="testadistica">Estadisticas</div>
      <br />
      <div key="tvida">Vida</div>
      <div><input key="vida" type="text" id="vida" onChange={(e) => handleChange(e)} /></div>
      <div key="tfuerza">Fuerza</div>
      <div><input key="fuerza" type="text" id="fuerza" onChange={(e) => handleChange(e)} /></div>
      <div key="tdefenza">Defenza</div>
      <div><input key="defenza" type="text" id="defenza" onChange={(e) => handleChange(e)} /></div>
      <div key="tvelocidad">Velocidad</div>
      <div><input key="velocidad" type="text" id="velocidad" onChange={(e) => handleChange(e)} /></div>
      <br />
      <div><input key="enviar" type="submit" value="Enviar"/></div>
    </form>
  </div>
  )
}