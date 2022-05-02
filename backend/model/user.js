import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('test', 'root', 'Rahul.a5859@', {dialect: 'mysql'});

export const User = sequelize.define('user_details', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    phone: Sequelize.STRING,
    name: Sequelize.STRING,
    email: {
        type:Sequelize.STRING,
        unique:true
    },
    password: Sequelize.STRING,
    plan: Sequelize.STRING
});


sequelize.sync()  

// sequelize.sync().then(function () {
//     return User.create({
//         username: 'janedoe',
//         birthday: new Date(1980, 6, 20)
//     });
// }).then(function (jane) {
//     console.log(jane.get({
//         plain: true
//     }));
// });