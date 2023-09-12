import { Sequelize } from "sequelize";
import { db } from '../config/database.js'
import Mata_Pelajaran from "./mata_pelajaran.js";
import User from "./user.js";
const { DataTypes } = Sequelize

const Nilai = db.define('nilai', {
    kode_nilai: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    mata_pelajaran: {
        type: DataTypes.STRING,
        required: true,
        FOREIGNKEYS: true,
        references: Mata_Pelajaran.kode_matapelajaran
    },
    username: {
        type: DataTypes.STRING,
        required: true,
        FOREIGNKEYS: true,
        references: User.username
    },
    nilai: {
        type: DataTypes.INTEGER,
        required: true,
    },
}, {
    freezeTableName: true
})

export default Nilai