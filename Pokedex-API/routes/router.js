const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = (app, db) => {
	//CRUD
	app.get('/pokemons', (req, res) => {
		// Get all the pokemons with offset and limit : 50
		db.Pokemons.findAll({
			// Include JOIN in result
			include: [{
				model: db.Types,
				where: {
				  ename: req.query.type
				},
				required: true
			}],
			limit: 50,
			[Op.or]: [{offset: JSON.parse(req.query.offset)}, {offset: 0}],
			where: {
			[Op.or]: [
				{id_pokemon: req.query.id},
				{ename : req.query.name},
			],
		}}).then(result => {
			res.json(result);
		});
	});

	app.get('/pokemons/:id', (req, res) => {
		// Get a 'pokemon' by id
		db.Pokemons.findOne({
			include: [{ all: true }],
			where: { id: req.params.id }
		}).then(result => {
			res.json(result);
		});
	});
	

	app.put('/pokemons/:id', (req, res) => {
		// Update a 'pokemon'
		db.Pokemons.update({
			ename: req.body.name
		},{
			where: {
				id: req.params.id
			}
		}).then(() => {
			return db.Pokemons.findOne({
				include: [{ all: true }],
				where: { id: req.params.id }
			});
		}).then(result => {
			res.json(result);
			console.log( `Pokemon updated is :  ${req.body.ename} `);
		});
	});

	app.post('/pokemons/:id', (req, res) => {
		let pokemonCreated;
		// Create a pokemon
		db.Pokemons.create({
            base: req.body.base,
            cname: req.body.cname,
            ename: req.body.ename,
            id_pokemon: JSON.parse(req.body.id_pokemon),
			jname: req.body.jname
			
        }).then((_pokemonCreated) => {
			pokemonCreated = _pokemonCreated;
			// add type1 through the association 'Pokemons-Types'
            if (req.body.type1) {
                // Find the 'type1' in types DB 'Types'
                return db.Types.findOne({
                    where: {
                        ename : req.body.type1
                    }
                }).then((type1) => {
                    // Add 'type1' found to this 'pokemon' through the associate table
                    return pokemonCreated.addTypes(
                        type1,
                        { through: { 
                            ename: type1.get('ename')
                        }
                    });
                });
			}
			return Promise.resolve();

		}).then(() => {
			// same type1 : add type2 through the association 'Pokemons-Types'
			if (req.body.type2) {
                return db.Types.findOne({
                    where: {
                        ename : req.body.type2
                    }
                }).then((type2) => {
                    return pokemonCreated.addTypes(
                        type2,
                        { through: { 
                            ename: type2.get('ename')
                        }
                    });
                });
			}
			return Promise.resolve();
			
		}).then(() => {
			return db.Pokemons.findOne({
				include: [{ all: true }],
				where: { id_pokemon: req.params.id }
			});
        }).then(result => {
			res.json(result);
		});
	});
		

	app.delete('/pokemons/:id', (req, res) => {
		// Delete a pokemon
		db.Pokemons.destroy({
			where: {
				id: req.params.id
			}
		}).then(result => {
			res.json({});
		});
	});
};
