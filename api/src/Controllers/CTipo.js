const axios = require("axios")
const {Tipo} = require("../db")
const URL="https://pokeapi.co/api/v2/type"

async function getTypeToDb (){
    let resulType
    try{
        resulType = (await axios.get(`${URL}`)).data.results
    }catch(error){
        console.log(`ERROR EN RECEPCION DE DATOS`)
    }
    resulType.forEach(e => {
        let tipo = {
            id:parseInt(e.url.split('/')[e.url.split('/').length-2]),
            nombre:e.name
        }        
        Tipo.create(tipo)
        .catch(error=> console.log(error))
    });
    
}

async function getType (req, res){
    let resulType
    try{
        resulType = (await axios.get(`${URL}`)).data.results
    }catch(error){
        res.status(501).send(`ERROR EN RECEPCION DE DATOS`)
    }
    res.json(resulType.map(p=>p.name))
}

module.exports= {
    getType,
    getTypeToDb
}