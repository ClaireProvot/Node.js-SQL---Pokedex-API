// Creation of the model "Pokemons" in DB
module.exports = (sequelize, Datatypes) => {
    let Pokemons = sequelize.define('Pokemons', {
          // Here are the columns of the table
        base: Datatypes.JSON,
        cname: Datatypes.CHAR(45),
        ename: Datatypes.CHAR(45),
        id_pokemon: Datatypes.INTEGER,
        jname: Datatypes.CHAR(45)
    }, {});
    return Pokemons;
};
