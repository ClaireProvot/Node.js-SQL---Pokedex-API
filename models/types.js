// Creation of the model "Types" in DB
module.exports = (sequelize, Datatypes) => {
    let Types = sequelize.define('Types', {
        // Here are the columns of the table
        cname: Datatypes.CHAR(45),
        ename: Datatypes.CHAR(45),
        jname: Datatypes.CHAR(45),
    }, {});
    return Types;
};