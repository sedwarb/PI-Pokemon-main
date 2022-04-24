import React,{useState,useEffect} from 'react';
import {tiposList,sTpos} from '../../actions/actions'
import { useDispatch, useSelector } from 'react-redux'


export default function ListTypes ({lTipos}) {
    const [datos, setDatos] = useState({acum:true});
    const sTipo = useSelector(state=>state.sTipo)
    const dispatch = useDispatch()
    function ftipo(e){
        if(datos.acum){
            setDatos({acum: false})
        }else{
          dispatch(sTpos([...sTipo,{[e.target.id]:e.target.value}]))
          setDatos({type:sTipo})
          setDatos({acum: true})
        }        
    }
    useEffect(()=>{
        dispatch(tiposList(sTipo))
    },[sTipo])
    return (
      <div key={`divTipoGen`}>
        <div key={`divTipoppl`}>Tipo</div>
        <select name="tipos" id="tipos" key={`tiposel`} onClick={(e)=>ftipo(e)}>
            {lTipos.map((tipo,i)=>{
                return <option key={`plista${i}`} value={`${tipo.id}:${tipo.name}`} id={tipo.id} >{tipo.name}</option>
            })}
        </select>
        <div className='divTipo' key={`divTipo`} id="divTipo" >{sTipo.map(p=><div>{`- ${p.tipos.split(":")[1]} -`}</div>)}
        <input type="button" key={`butlim`} value="Limpiar" onClick={()=>dispatch(sTpos([]))} />
        </div>
      </div>
    );
};