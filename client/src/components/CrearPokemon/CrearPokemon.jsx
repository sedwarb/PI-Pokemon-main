import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {createPokemons,sTpos,getPokemons} from "../../actions/actions"
import ListaTipos from "../ListaTipos/ListaTipos"
import './CrearPokemon.css'

export function CrearPokemon(){
  const [datos, setDatos] = useState({});
  const dispatch = useDispatch()
  const stateGen = useSelector(state=>state)
  function handleChange(e){
    setDatos({...datos,[e.target.id]:e.target.value})
  }  
  return (
  <div key='79' className='crearTodoDiv'>
    <form key="80" className="formCrear" onSubmit={(e) => {
        e.preventDefault();
        if(!verificarNombre()){
          if(validar()){
            dispatch(createPokemons(creaObj()))
            limpiar()
            alert(`Se ha creado el pokemon: ${datos.nombre}`)
            dispatch(getPokemons())
          }          
        }else alert(`El nombre: ${datos.nombre} ya existe`)        
      }}>
      <div key="81" id='divFormCrear' className='divFormCrear'>
        <div key="82" className='datosPpl'>
          <div key="83" className='divdatos'>Datos del Pokemon</div>
          <div key="84" className='datosP'>            
            <div key="85" className='divForm'>Imagen</div>
            <div key="86" className='divForm'><input className='divinput' key="94" type="text" id="imagen" onChange={(e) => handleChange(e)} /></div>
            <div key="87" className='divForm'>Nombre</div>
            <div key="88" className='divForm'><input className='divinput' key="95" type="text" id="nombre" onChange={(e) => handleChange(e)} /></div>
            <div key="89" className='tipoLista'><ListaTipos lTipos={stateGen.pokemonTypes}/></div>
            <div key="90" className='divForm'>Altura</div>
            <div key="91" className='divForm'><input className='divinput' key="96" type="text" id="altura" onChange={(e) => handleChange(e)} /></div>
            <div key="92" className='divForm'>Peso</div>
            <div key="93" className='divForm'><input className='divinput' key="97" type="text" id="peso" onChange={(e) => handleChange(e)} /></div>
          </div>
        </div>
        <div key="98" className='estadisPpl'>
          <div key="99" className='divesta'>Estadisticas</div>
          <div key="100" className='estadis'>            
            <div key="101" className='divForm'>Vida</div>
            <div key="102" className='divForm'><input key="vida" type="text" id="vida" onChange={(e) => handleChange(e)} /></div>
            <div key="103" className='divForm'>Fuerza</div>
            <div key="104" className='divForm'><input key="fuerza" type="text" id="fuerza" onChange={(e) => handleChange(e)} /></div>
            <div key="105" className='divForm'>Defenza</div>
            <div key="106" className='divForm'><input key="defenza" type="text" id="defenza" onChange={(e) => handleChange(e)} /></div>
            <div key="107" className='divForm'>Velocidad</div>
            <div key="108" className='divForm'><input key="velocidad" type="text" id="velocidad" onChange={(e) => handleChange(e)} /></div>
          </div>
        </div>        
      </div>      
      <div className='divsumit' key="109"><input className='impSumi' key="110" type="submit" value="Enviar"/></div>      
    </form>
  </div>
  )
  function creaObj(){    
    return {
      imagen:datos.imagen,
      nombre:datos.nombre,
      tipo:stateGen.tiposlist,
      altura:datos.altura,
      peso:datos.peso,
      vida:datos.vida,
      fuerza:datos.fuerza,
      defenza:datos.defenza,
      velocidad:datos.velocidad
    }
  }
  function verificarNombre(){
    return stateGen.pokemonsLoaded.find(p=>p.nombre.toLowerCase() ===datos.nombre.toLowerCase())    
  }
  function validar(){
   let nombreV=/^[A-Z]+$/i.test(datos.nombre)
   if(!datos.imagen||!datos.nombre||stateGen.tiposlist.length===0){
    alert("Debe llenar los campos Imagen,Nombre y Tipo")
    return false
   }
   if(nombreV===false){
    alert("El Nombre no debe contener Numeros")
    return false
   }
   if(parseInt(datos.altura)<1 ||
    parseInt(datos.altura)>50 || !datos.altura || isNaN(datos.altura)){
    alert("La altura debe ser entre 1 y 50")
    return false
   }
   if(parseInt(datos.peso)<1 || parseInt(datos.peso)>50
   || !datos.peso || isNaN(datos.peso)){
    alert("El peso debe ser entre 1 y 50")
    return false
   }
   if(parseInt(datos.vida)<1 || parseInt(datos.vida)>300
   || !datos.vida || isNaN(datos.vida)){
    alert("La vida debe ser entre 1 y 300")
    return false
   }   
   if(parseInt(datos.fuerza)<1 || parseInt(datos.fuerza)>200
   || !datos.fuerza || isNaN(datos.fuerza)){
    alert("La fuerza debe ser entre 1 y 200")
    return false
   }
   if(parseInt(datos.defenza)<1 || parseInt(datos.defenza)>200
   || !datos.defenza || isNaN(datos.defenza)){
    alert("La defenza debe ser entre 1 y 200")
    return false
   }
   if(parseInt(datos.velocidad)<1 || parseInt(datos.velocidad)>300
   || !datos.velocidad || isNaN(datos.velocidad)){
    alert("La velocidad debe ser entre 1 y 300")
    return false
   }
   return true
  }
  function limpiar(){
    let id = ["imagen","nombre","altura","peso","vida","fuerza","defenza","velocidad"]
    id.forEach(p=>document.getElementById(p).value = "")
    dispatch(sTpos([]))
  }
}