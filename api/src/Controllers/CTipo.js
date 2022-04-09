const axios = require("axios")
const URL="https://pokeapi.co/api/v2/type"

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
    getType
}