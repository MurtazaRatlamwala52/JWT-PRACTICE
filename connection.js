const {Sequelize, DataTypes} = require('sequelize');
const dotenv = require('dotenv')
dotenv.config()

// console.log(process.env.password)

const sequelize = new Sequelize('jobby', 'root', process.env.password, {
    host: 'localhost',
    dialect:'mysql',
    logging: false
})

sequelize.authenticate().then(()=>console.log('DB Connected')).catch((err)=>console.log(err))

const candidates = require('./models/candidates')(sequelize, DataTypes)
sequelize.sync({alter: true})
module.exports = {candidates}