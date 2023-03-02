// const { Sequelize, DataTypes  } = require("sequelize");
const bcrypt = require("bcrypt");


module.exports = (sequelize, DataTypes) => {
    const candidate = sequelize.define("candidate", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value){
                this.setDataValue('password', bcrypt.hashSync(value, 10));
            }
        }
    })
    return candidate;
}