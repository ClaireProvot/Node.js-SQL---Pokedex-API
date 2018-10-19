// Import dependancies
import PokemonsJson from '../../Pokedex-assignment/data/pokedex.json';
import TypesJson from '../../Pokedex-assignment/data/types.json';

module.exports = (app, db) => {
	//CRUD
	app.get('/pokemons/all', (req, res) => {
		// Get all the pokemons
		db.Pokemons.findAll({
			include: [{ all: true }],
		}).then(result => {
			res.json(result);
		});
	});

	app.get('/pokemons/:id', (req, res) => {
		// Get a 'pokemon'
		db.Pokemons.findAll({
			include: [{ all: true }],
			where: { id: req.params.id }
		}).then(result => {
			res.json(result);
		});
	});
	

	app.put('/pokemons/update/:id', (req, res) => {
		// Update a 'pokemon'
		db.Pokemons.update({
			ename: req.body.ename
		},{
			where: {
				id: req.params.id
			}
		}).then(result => {
			res.json(result);
		});
	});

	app.post('/pokemons/allnew', (req, res) => {
		// Populate DB from JSON Pokedex data (all in once)
		let i = 0;
		while (TypesJson[i] != undefined) {
			// Populate data of table 'Types' with a loop
			db.Types.create({
				cname: TypesJson[i].cname,
				ename: TypesJson[i].ename,
				jname: TypesJson[i].jname
			});
			i++;
		}	

		let j = 0;
		while (PokemonsJson[j] != undefined) {
			let currentPokemonJson = PokemonsJson[j];
			// Populate data of table 'Pokemons' with a loop
			db.Pokemons.create({
				base: PokemonsJson[j].base,
				cname: PokemonsJson[j].cname,
				ename: PokemonsJson[j].ename,
				id_pokemon: PokemonsJson[j].id,
				jname: PokemonsJson[j].jname
			}).then((currentPokemonCreated) => {
				let k = 0;
				while (currentPokemonJson.type[k] != undefined) {
					// Find each 'type' for each 'pokemon'
					db.Types.findOne({
						where: {
							cname : currentPokemonJson.type[k]
						}
					}).then((currentType) => {
						// Add each 'type' found to each 'pokemon' through the associate table
						return currentPokemonCreated.addTypes(
							currentType,
							{ through: { 
								cname: currentType.get('cname')
							}
						});
					});
					k++;
				}
			})
			j++;
		}	
	});

	app.delete('/pokemons/delete/:id', (req, res) => {
		// Delete a pokemon
		db.Pokemons.destroy({
			where: {
				id: req.params.id
			}
		}).then(result => {
			res.json(result);
		});
	});
};
