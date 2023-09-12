import { Sequelize } from "sequelize";
import { db } from '../config/database.js'
const { DataTypes } = Sequelize

const User = db.define('user', {
    username: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        required: true,
    },
    nama: {
        type: DataTypes.STRING,
        required: true,
    },
    namaSekolah: {
        type: DataTypes.STRING,
        required: false,
    },
    foto: {
        type: DataTypes.STRING,
        required: true,
    },
    email: {
        type: DataTypes.STRING,
        required: true,
    },
    resetPasswordLink: {
        type: DataTypes.STRING,
        required: false,
        defaultValue: ''
    }
}, {
    freezeTableName: true
})

export default User