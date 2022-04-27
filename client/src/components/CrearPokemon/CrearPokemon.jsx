import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {createPokemons,sTpos} from "../../actions/actions"
import ListaTipos from "../ListaTipos/ListaTipos"
import './CrearPokemon.css'

export function CrearPokemon(){
  const [datos, setDatos] = useState({});
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
  function validar(){
    /*
    colocar obligatorio: imagen,nombre,tipo
    minimo y maximos: altura,peso:1-50,vida,velocidad:1-300,
    fuerza,defenza:1-200
    */
   let nombreV=/^[A-Z]+$/i.test(datos.nombre)
   if(!datos.imagen||!datos.nombre||tipoEnviar.length===0){
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
    <form key="formCrear" onSubmit={(e) => {
        e.preventDefault();
        if(validar()){
          dispatch(createPokemons(creaObj()))
          limpiar()
          alert(`Se ha creado el pokemon: ${datos.nombre}`)
        }
      }}>
      <div key="divFormCrear" id='divFormCrear'>
        <div key="tdatos" className='divdatos'>Datos del Pokemon</div>
        <div key="datosP" className='datosP'>            
            <div key="timagen" className='divForm'>Imagen</div>
            <div key="divImag" className='divForm'><input className='divinput' key="imagen" type="text" id="imagen" onChange={(e) => handleChange(e)} /></div>
            <div key="divNom" className='divForm'>Nombre</div>
            <div key="divNomIn" className='divForm'><input className='divinput' key="nombre" type="text" id="nombre" onChange={(e) => handleChange(e)} /></div>
            <div key="divTip" className='tipoLista'><ListaTipos lTipos={tipos}/></div>
            <div key="taltura" className='divForm'>Altura</div>
            <div key="divAltIn" className='divForm'><input className='divinput' key="altura" type="text" id="altura" onChange={(e) => handleChange(e)} /></div>
            <div key="tpeso" className='divForm'>Peso</div>
            <div key="divPeso" className='divForm'><input className='divinput' key="peso" type="text" id="peso" onChange={(e) => handleChange(e)} /></div>
        </div>
        <div key="testadistica" className='divesta'>Estadisticas</div>
        <div key="estadis" className='estadis'>            
            <div key="tvida" className='divForm'>Vida</div>
            <div key="divVida" className='divForm'><input key="vida" type="text" id="vida" onChange={(e) => handleChange(e)} /></div>
            <div key="tfuerza" className='divForm'>Fuerza</div>
            <div key="tfuerzaImp" className='divForm'><input key="fuerza" type="text" id="fuerza" onChange={(e) => handleChange(e)} /></div>
            <div key="tdefenza" className='divForm'>Defenza</div>
            <div key="divinpdefenza" className='divForm'><input key="defenza" type="text" id="defenza" onChange={(e) => handleChange(e)} /></div>
            <div key="tvelocidad" className='divForm'>Velocidad</div>
            <div key="divinpvelocidad" className='divForm'><input key="velocidad" type="text" id="velocidad" onChange={(e) => handleChange(e)} /></div>
        </div>
      </div>      
      <div className='divsumit' key="submint"><input className='impSumi' key="enviar" type="submit" value="Enviar"/></div>
    </form>
  </div>
  )
}

/*


*/