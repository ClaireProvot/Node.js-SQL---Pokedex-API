// Creation of the model "Types" in DB
module.exports = (sequelize, Datatypes) => {
    let Types = sequelize.define('Types', {
        cname: Datatypes.CHAR(45),
        ename: Datatypes.CHAR(45),
        jname: Datatypes.CHAR(45)
    }, {});
    return Types;
};