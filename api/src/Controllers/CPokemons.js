const axios = require("axios")
//Actualmente esta limitado a cinco (5) pokemon por request
const URL="https://pokeapi.co/api/v2/pokemon"
const limite = '?limit=5&offset=0'

async function getPokemons (req, res){
    let resultPokemons
    
        if(req.query.name){
            try{
                resultPokemons = (await axios.get(`${URL}/${JSON.parse(req.query.name)}`)).data
            }catch(error){
                res.status(501).send(`No Existe El Pokemon: ${JSON.parse(req.query.name)}`)
            }

            res.json({
                imagen:resultPokemons.sprites.other.dream_world.front_default,
                nombre:resultPokemons.forms[0].name,
                tipos:resultPokemons.types.map(p=>p.type.name)
                
            })
            
            
        }else{
            resultPokemons = (await axios.get(`${URL}${limite}`)).data.results
            .map(linkToPoke=>{
                return linkToPoke.url
            })

            let datosPoke = []
        
            for (let index = 0; index < resultPokemons.length; index++) {
                datosPoke.push((await axios.get(resultPokemons[index])).data)
            }
            res.json(
                datosPoke.map(p=>{
                    return {
                        imagen:p.sprites.other.dream_world.front_default,
                        nombre:p.forms[0].name,
                        tipos:p.types.map(p=>p.type.name)
                        
                    }
                })
            )        
        }

        

        //let dbCharacters= (await Characters.findAll()).concat(characters)
        //console.log("dbCharacters",dbCharacters)
        //res.send(dbCharacters)
        
    
}

///pokemons/{idPokemon}
async function getPokemonsById (req, res){
    let resultPokemons = (await axios.get(`${URL}/${req.params.idPokemon}/`)).data
    
    res.json(
        {
            id:resultPokemons.id,
            imagen:resultPokemons.sprites.other.dream_world.front_default,
            nombre:resultPokemons.forms[0].name,
            tipos:resultPokemons.types.map(p=>p.type.name),
            estadisticas:resultPokemons.stats.filter((p,i)=>i===0||i===1||i===2||i===5)
            .map((r,i)=>{
                if(i===0)return `Vida: ${r.base_stat}`
                if(i===1)return `Fuerza: ${r.base_stat}`
                if(i===2)return `Defenza: ${r.base_stat}`
                if(i===3)return `Velocidad: ${r.base_stat}`
            }),
            altura:resultPokemons.height,
            peso:resultPokemons.weight

        }
    )
}

module.exports= {
    getPokemons,
    getPokemonsById
}