// Import dependancies
import PokemonsJson from '../../Pokedex-assignment/data/pokedex.json';

module.exports =  (app, db) => {
	//CRUD
	app.get('/pokemons/all', (req, res) => {
		// Get all the pokemons
		db.Pokemons.findAll({}).then((result) => {
			res.json(result);
		});
	});

	app.get('/pokemons/:id', (req, res) => {
		// Update a name
		db.Pokemons.findAll({
			where: {
				id: req.params.id
			}
		}).then((result) => {
			res.json(result);
		});
	});
	

	app.put('/pokemons/update/:id', (req, res) => {
		// Update a name
		db.Pokemons.update({
			ename: req.body.ename
		},{
			where: {
				id: req.params.id
			}
		}).then((result) => {
			res.json(result);
		});
	});

	app.post('/pokemons/allnew', (req, res) => {
		// Rows create in DB from JSON Pokedex data (all in once)
		let i = 0;
      	while (PokemonsJson[i] != undefined) {
        	db.Pokemons.create({
            	base: PokemonsJson[i].base,
            	cname: PokemonsJson[i].cname,
            	ename: PokemonsJson[i].ename,
            	id_pokemon: PokemonsJson[i].id,
            	jname: PokemonsJson[i].jname
          	});
    		i++;
	  	}		
	});

	app.delete('/pokemons/delete/:id', (req, res) => {
		// Delete a pokemon
		db.Pokemons.destroy({
			where: {
				id: req.params.id
			}
		}).then((result) => {
			res.json(result);
		});
	});
}
