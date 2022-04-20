import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {createPokemons} from "../../actions/actions"
import './CrearPokemon.css'

export function CrearPokemon(){
  const [datos, setPagina] = useState({acum:true});
  const [sTipo, setSTipo] = useState([]);
  const dispatch = useDispatch()
  const tipos = useSelector(state=>state.pokemonTypes)
  function handleChange(e){
    setPagina({...datos,[e.target.id]:e.target.value})
  }
  function ftipo(e){
    if(datos.acum){
      setPagina({acum: false})
    }else{
      setSTipo([...sTipo,e.target.value])
      setPagina({type:sTipo})
      setPagina({acum: true})
    }
  }
  function creaObj(){
    //let tipo=[datos.tipo]
    return {
      imagen:datos.imagen,
      nombre:datos.nombre,
      tipo:datos.type,
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
        //dispatch(createPokemons(creaObj()))
        console.log(JSON.stringify(creaObj()))
      }}>
      <div>Datos del Pokemon</div>
      <br />
      <div>Imagen</div>
      <div><input type="text" id="imagen" onChange={(e) => handleChange(e)} /></div>
      <div>Nombre</div>
      <div><input type="text" id="nombre" onChange={(e) => handleChange(e)} /></div>
      <div>Tipo</div>
      <select name="tipos" id="tipos" onClick={(e)=>ftipo(e)}>
          {tipos.map((tipo,i)=>{
            return <option key={`plista${i}`} value={tipo} id={i+1} >{tipo}</option>
          })}
      </select>
      <div className='divTipo' >{sTipo.map(p=>{
          return <div>{`-${p}-`}</div>
      })}</div>
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