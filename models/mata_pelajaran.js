import { Sequelize } from "sequelize";
import { db } from '../config/database.js'
const { DataTypes } = Sequelize

const Mata_Pelajaran = db.define('mata_pelajaran', {
    kode_matapelajaran: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    mata_pelajaran: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
    },
    link_foto: {
        type: DataTypes.STRING,
        required: false,
    },
}, {
    freezeTableName: true
})

export default Mata_Pelajaran