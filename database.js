// Import dependancies
let PokemonsJson = require('../Pokedex-assignment/data/pokedex.json');
let TypesJson = require('../Pokedex-assignment/data/types.json');
let db = require('../Pokedex-API/models/index');

// Populate DB SQL from JSON Pokedex data (all in once)
const populateDB = () => {
    // Populate data of table 'Types' with a loop
    let i = 0;
    while (TypesJson[i] != undefined) {
        db.Types.create({
            cname: TypesJson[i].cname,
            ename: TypesJson[i].ename,
            jname: TypesJson[i].jname,
        });
        i++;
    }

    // Populate data of table 'Pokemons' with a loop
    let j = 0;
    while (PokemonsJson[j] != undefined) {
        let currentPokemonJson = PokemonsJson[j];
        db.Pokemons.create({
            base: PokemonsJson[j].base,
            cname: PokemonsJson[j].cname,
            ename: PokemonsJson[j].ename,
            id_pokemon: PokemonsJson[j].id,
            jname: PokemonsJson[j].jname,
        }).then((currentPokemonCreated) => {
            let k = 0;
            while (currentPokemonJson.type[k] != undefined) {
                // Find each 'type' for each 'pokemon'
                db.Types.findOne({
                    where: {
                        cname: currentPokemonJson.type[k],
                    }
                }).then((currentType) => {
                    // Add each 'type' found to each 'pokemon' through the associate table
                    return currentPokemonCreated.addTypes(
                        currentType, {
                            through: {
                                cname: currentType.get('cname')
                            }
                        });
                });
                k++;
            }
        })
        j++;
    }
};

populateDB();