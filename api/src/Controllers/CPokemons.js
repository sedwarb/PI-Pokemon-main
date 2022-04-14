const axios = require("axios")
const { Op } = require("sequelize");
const { response } = require("express")
const {Pokemon,poketipo,Tipo} = require("../db")
//Actualmente esta limitado a cinco (5) pokemon por request
const URL="https://pokeapi.co/api/v2/pokemon"
const limite = '?limit=5&offset='

async function getPokemons (req, res, next){
    let resultPokemons
    if(!isNaN(req.query.name)) res.send("Debe colocarse un Nombre no un ID")
    if(req.query.name){
        let dbPokemon
        try{
            dbPokemon=(await Pokemon.findOne(
                {
                    where: {nombre: req.query.name},
                    attributes:['imagen','nombre','id','vida','fuerza','defenza','velocidad','altura','peso'],
                    include: [
                        {model: Tipo,attributes:['nombre'], through: {attributes:[]}}
                    ]
                }
            ))
            let Ntipo = dbPokemon.tipos.map(p=>p.nombre)
            let NdbPokemon ={
                imagen:dbPokemon.imagen,
                nombre:dbPokemon.nombre,
                tipos:Ntipo,
                id:dbPokemon.id,
                estadisticas:{
                    vida:dbPokemon.vida,
                    fuerza:dbPokemon.fuerza,
                    defenza:dbPokemon.defenza,
                    velocidad:dbPokemon.velocidad
                },
                altura:dbPokemon.altura,
                peso:dbPokemon.peso
            }
            if(dbPokemon)res.json(NdbPokemon)
        }catch(error){
            //console.log(`***Error en busqueda de BD***: ${error}`)
            try{
                resultPokemons = (await axios.get(`${URL}/${req.query.name}`)).data
            }catch{
                res.status(404).send(`No Existe El Pokemon: ${req.query.name}`)
            }
            let [vida,fuerza,defenza,velocidad] = resultPokemons.stats.filter((p,i)=>i===0||i===1||i===2||i===5)
                .map((r)=>r.base_stat)
            res.json({
                imagen:resultPokemons.sprites.other.dream_world.front_default,
                nombre:resultPokemons.forms[0].name,
                tipos:resultPokemons.types.map(p=>p.type.name),
                id:resultPokemons.id,
                estadisticas:{vida,fuerza,defenza,velocidad},
                altura: resultPokemons.altura,
                peso: resultPokemons.peso
            })
        }
        
        
    }else{
        resultPokemons = (await axios.get(`${URL}${limite}0`)).data.results
        .map(linkToPoke=>{
            return linkToPoke.url
        })

        let datosPoke = []
    
        for (let index = 0; index < resultPokemons.length; index++) {
            datosPoke.push((await axios.get(resultPokemons[index])).data)
        }

        let apiPokemon = datosPoke.map(p=>{
            let [vida,fuerza,defenza,velocidad] =p.stats.filter((p,i)=>i===0||i===1||i===2||i===5)
            .map(r=>r.base_stat)
            return {
                imagen:p.sprites.other.dream_world.front_default,
                nombre:p.forms[0].name,
                tipos:p.types.map(p=>p.type.name),
                id:p.id,
                estadisticas:{vida,fuerza,defenza,velocidad},
                altura: p.altura,
                peso: p.peso
            }
        })
        let dbPokemon
        try{
            dbPokemon=(await Pokemon.findAll({attributes: ['imagen','nombre','id','vida','fuerza','defenza','velocidad','altura','peso'],
            where: {
                nombre:{
                    [Op.ne]: "PokeDefault"
                }
            },
            include: [
                {model:Tipo,attributes:["nombre"],through:{attributes:[]}}
            ]
        }))
        }catch(error){
            console.log(`Hubo un Error de BD`)
            res.json(apiPokemon)
        }        
        
        let NdbPokemon=[],Ntipo
        for (let i = 0; i < dbPokemon.length; i++) {
            Ntipo = dbPokemon[i].tipos.map(p=>p.nombre)
            NdbPokemon.push(
                {
                    nombre:dbPokemon[i].nombre,
                    imagen:dbPokemon[i].imagen,
                    tipos:Ntipo,
                    id:dbPokemon[i].id,
                    estadisticas:{
                        vida:dbPokemon[i].vida,
                        fuerza:dbPokemon[i].fuerza,
                        defenza:dbPokemon[i].defenza,
                        velocidad:dbPokemon[i].velocidad
                    },
                    altura:dbPokemon[i].altura,
                    peso:dbPokemon[i].peso
                }
            )      
        }
        //console.log(`Ndbpokemon: ${JSON.stringify(NdbPokemon)}`)
        res.json(NdbPokemon.concat(apiPokemon))        
    }
}

async function getPokemonsById (req, res){
    let resultPokemons
    let dbPokemon=null
    if(isNaN(req.params.idPokemon)===true) res.send("Error en el id ingresado")
    try{
        dbPokemon=(await Pokemon.findOne(
            {
                where: {id: parseFloat(req.params.idPokemon)},
                attributes:['imagen','nombre','id','vida','fuerza','defenza','velocidad','altura','peso'],
                include: [
                    {model: Tipo,attributes:['nombre'], through: {attributes:[]}}
                ]
            }
        ))
        if(!dbPokemon)console.log("No esta en la base de datos")
        else res.json({
            imagen:dbPokemon.imagen,
            nombre:dbPokemon.nombre,
            tipo:dbPokemon.tipos,
            id:dbPokemon.id,
            estadisticas:{
                vida:dbPokemon.vida,
                fuerza:dbPokemon.fuerza,
                defenza:dbPokemon.defenza,
                velocidad:dbPokemon.velocidad
            }
            /*
            estadisticas:[
                `Vida: ${dbPokemon.vida}`,
                `Fuerza: ${dbPokemon.fuerza}`,
                `Defenza: ${dbPokemon.defenza}`,
                `Velocidad: ${dbPokemon.velocidad}`
            ]*/,
            altura: dbPokemon.altura,
            peso: dbPokemon.peso
        })
    }catch{
        console.log('Error al encontrar id en la BD')
    }
    let i = req.params.idPokemon
    if(i>11000) res.json("Id del Pokemon No Existe")
    else {resultPokemons = (await axios.get(`${URL}/${req.params.idPokemon}/`)).data}
    let [vida,fuerza,defenza,velocidad] = resultPokemons.stats.filter((p,i)=>i===0||i===1||i===2||i===5)
    .map((r)=>r.base_stat)
    res.json(
        {            
            imagen:resultPokemons.sprites.other.dream_world.front_default,
            nombre:resultPokemons.forms[0].name,
            tipos:resultPokemons.types.map(p=>p.type.name),
            id:resultPokemons.id,
            estadisticas:{vida,fuerza,defenza,velocidad}
            /*
            estadisticas:resultPokemons.stats.filter((p,i)=>i===0||i===1||i===2||i===5)
            .map((r,i)=>{
                if(i===0)return `Vida: ${r.base_stat}`
                if(i===1)return `Fuerza: ${r.base_stat}`
                if(i===2)return `Defenza: ${r.base_stat}`
                if(i===3)return `Velocidad: ${r.base_stat}`
            })*/,
            altura:resultPokemons.height,
            peso:resultPokemons.weight

        }
    )
}

async function createPokemon(req, res){
    const {nombre, vida, fuerza, defenza, velocidad, altura, peso,tipo}= req.body
    const imangen1 = "https://pm1.narvii.com/6305/84ffa2658769b31eb8c7dd5c71105a39ae3467a4_hq.jpg"
    let pokemon={id:Date.now(),nombre:nombre.toLowerCase(), vida, fuerza, defenza, velocidad, altura, peso, imagen:imangen1}
    Pokemon.create(pokemon)
    .then((response)=> {
        let Ctipo = {pokemonId:response.id,tipoId:tipo}
        if(typeof tipo === 'object'){
            tipo.forEach(e=>{
                Ctipo = {pokemonId:response.id,tipoId:e}
                poketipo.create(Ctipo)
            })
        }else{
            poketipo.create(Ctipo)
        }        
        res.send('Pokemon Creado Exitosamente')
    })    
    .catch(error=> console.log(error))
}

async function primerPokemondb(){
    const imangen1 = "https://pm1.narvii.com/6305/84ffa2658769b31eb8c7dd5c71105a39ae3467a4_hq.jpg"
    let pokemon={id:Date.now(),nombre:"PokeDefault", imagen:imangen1}
    Pokemon.create(pokemon)
}

module.exports= {
    getPokemons,
    getPokemonsById,
    createPokemon,
    primerPokemondb
}